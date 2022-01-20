import { Request, Response } from "express";
import { Appointment } from "../../models/appointment";
import { formatDate } from "../../utils/format";
import { createSlots, getExistingSlots, removeAvailability, Slot, updateLicenses } from "../../logic/provider";
import { createProvider } from "../../logic/registration";
import { Provider } from "../../models/provider";
import { BadRequestError } from "../../utils/errors";
import { sendProviderBookingNotification } from "../../logic/notifications";
import { sendText } from "../../lib/twilio";
import { sendProviderEmail, sendSimpleEmail } from "../../lib/sendgrid";
import { ProviderSlot } from "../../models/provider_slot";
import { toTimeString } from "../../utils/time";
import { differenceInHours, format } from "date-fns";
import { addDays,subDays,isDate,isAfter,differenceInDays } from "date-fns";

const MAX_DAYS = 365
const DEFAULT_DAYS = 14;
  
export const getStateUtilization = async (req: Request, res: Response) => {

   const params = verifyReportQueryParams(req)
      
   console.log(`getStateUtilization: ${format(subDays(params.startDate,1),'yyyy-MM-dd')} -> ${format(addDays(params.endDate,1),'yyyy-MM-dd')}`)

   const knex = Provider.knex();
   let { rows} : { rows: any[] }  = await knex.raw(
   ` with t1 as 
   (
      select
         state,
         taken,
    count(distinct provider_slots.id) as num_slots,
         sum(EXTRACT(epoch from provider_slots.slot_end - provider_slots.slot_start)) as sum_time
      from
         provider_slots 
       join
          provider_licenses on provider_slots.provider_id = provider_licenses.provider_id
         where 
         provider_slots.slot_start > '${format(subDays(params.startDate,1),'yyyy-MM-dd')}' and
         provider_slots.slot_start < '${format(addDays(params.endDate,1),'yyyy-MM-dd')}'
      group by
         state,
         taken 
   )
   select
      state,
  sum(sum_time/3600) as totalhours,
 sum(num_slots) as totalslots,
 SUM(
    CASE 
    WHEN taken=true THEN num_slots
    WHEN taken=false THEN 0
    END) as taken_slots,
 SUM(
    CASE 
    WHEN taken=true THEN SUM_TIME/3600
    WHEN taken=false THEN 0
    END) as taken_hours,
 SUM(
    CASE 
    WHEN taken=true THEN 0
    WHEN taken=false THEN SUM_TIME/3600
    END) as untaken_hours
   from
      t1
   group by state
   order by
      state;`
   )
   // Aligned to be the same as in Retool for consistency, adjust based on client feedback

   const data = rows.map(row => {
      const booked_hours = row.taken_hours;// - row.hours;
      const percent_utilization = row.totalhours? ((row.taken_hours /row.totalhours)*100 ).toFixed(2) + '%': "-"
      return {
        state: row.state,
        total_slots: Number(row.totalslots || 0),
        booked_slots: Number(row.taken_slots||0),
        total_hours: Number(row.totalhours || 0),
        booked_hours: Number(row.taken_hours || 0),
        percent_utilization,
      }
    })

   res.json({ data });
};

const verifyReportQueryParams = (req:Request) =>
{  
   //default to next 14 days
   let startDate = new Date()
   let endDate = addDays(new Date(), DEFAULT_DAYS)

   // if start and end date are passed then use those
   if(req.query.startDate && req.query.endDate)
   {
      startDate = new Date(req.query.startDate as string)
      endDate = new Date(req.query.endDate as string)

      if(!isDate(startDate) || !isDate(endDate))
      {
         throw new BadRequestError('Invalid date format')
      }

      if(!isAfter(endDate,startDate))
      {
         throw new BadRequestError('Start date must be before end date')
      }

      if(differenceInDays(endDate, startDate) > MAX_DAYS)
      {
         throw new BadRequestError(`Maximum days allowed is ${MAX_DAYS}`)
      }
   }
   
   return {startDate, endDate, days: differenceInDays(endDate, startDate)}
}



export const getProviderUtilization = async (req: Request, res: Response) => {

   const params = verifyReportQueryParams(req)
        
   console.log(`getStateUtilization: ${format(subDays(params.startDate,1),'yyyy-MM-dd')} -> ${format(addDays(params.endDate,1),'yyyy-MM-dd')}`)

  const knex = Provider.knex();
  let { rows} : { rows: any[] }   = await knex.raw(
    `
    
    
    select
         first_name || ' ' || last_name as name,

       sum(sum_time/3600) as totalhours,
	   sum(num_slots) as totalslots,
		SUM(
			CASE 
			WHEN taken=true THEN num_slots
			WHEN taken=false THEN 0
			END) as taken_slots,
		SUM(
			CASE 
			WHEN taken=true THEN SUM_TIME/3600
			WHEN taken=false THEN 0
			END) as taken_hours,
		SUM(
			CASE 
			WHEN taken=true THEN 0
			WHEN taken=false THEN SUM_TIME/3600
			END) as untaken_hours
    from
       providers
    join 
            users on users.id = providers.user_id
    left join (
      
       select
              providers.user_id as user_id,
          taken,
			count(distinct provider_slots.id) as num_slots,
          sum(EXTRACT(epoch from provider_slots.slot_end - provider_slots.slot_start)) as sum_time
       from
          provider_slots 
        join
           providers on provider_slots.provider_id = providers.id
          where 
                  provider_slots.slot_start > '${format(subDays(params.startDate,1),'yyyy-MM-dd')}' and
                  provider_slots.slot_start < '${format(addDays(params.endDate,1),'yyyy-MM-dd')}'
      
       group by
          user_id, taken ) as t1  on t1.user_id = providers.user_id
   
       group by
		name
    order by
      name;
           `
  , );

   // Aligned to be the same as in Retool for consistency, adjust based on client feedback
   /*const data = rows.filter(row => !row.taken).map(row => {
      const booked_hours = row.totalhours - row.hours;
      const percent_utilization = (100 - row.pct).toFixed(2) + '%';
      return {
      name: row.name,
      booked_hours,
      total_hours: row.totalhours || 0,
      percent_utilization,
      }
   })*/
   const data =  rows.map(row => {
      const percent_utilization = row.totalhours? ((row.taken_hours /row.totalhours)*100 ).toFixed(2) + '%': "-"
      return {
        name: row.name,
        total_slots: Number(row.totalslots || 0),
        booked_slots: Number(row.taken_slots||0),
        total_hours: Number(row.totalhours || 0),
        booked_hours: Number(row.taken_hours || 0),
        percent_utilization,
      }
    });
  
    res.json({ data });
  };
  
  