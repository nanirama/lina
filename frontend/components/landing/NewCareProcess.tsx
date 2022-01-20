/**
 * Shows the steps for the care process. "new" prefix is
 * a relic of when we had two options
 */
import React from "react";

interface Props { }

const StepNumber: React.FC = ({ children }) => {
  return (
    <div className="center">
      <span className="border border-coral-300 inline-flex items-center justify-center  w-14 h-14 md:w-16 md:h-16 bg-seashell rounded-full text-coral text-xl font-bold">
        {children}
      </span>
    </div>
  );
};

const Line: React.FC = () => {
  return (
    <div className="center">
      <div className="bg-coral h-12" style={{ width: "2px" }}></div>
    </div>
  );
};

const NewCareProcess: React.FC<Props> = ({ heading, data }) => {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <h1 className="text-3xl md:text-4xl text-center md:text-left mb-8">
        {heading ? heading : 'Our care process'}
      </h1>
      <div>
        {/* <h2 className="text-center text-2xl mb-8">Getting Started</h2> */}
        <div className="grid grid-cols-2 gap-y-2 md:gap-y-4 gap-x-1 mb-20 md:mb-0">

          { data && data.map(({fields}, index)=>{
            return(
              <>
              <StepNumber>{index+1}</StepNumber>
                <div className="h-12 flex flex-col">
                  <span className="font-bold">{fields.careProcessName}</span>
                  <span className="text-sm">{fields.careProcessDescription}</span>
                </div>
                {data.length != index+1 && <Line />}
                <div />
              </> 
            ) 
          })}
          {/* <StepNumber>1</StepNumber>

          <div className="h-12 flex flex-col">
            <span className="font-bold">Free Assessment</span>
            <span className="text-sm">It only takes 5 minutes.</span>
          </div>
          <Line />
          <div />

          <StepNumber>2</StepNumber>
          <div className="h-12 flex flex-col">
            <span className="font-bold">Appointment</span>
            <span className="text-sm">
              Meet with a clinician from the comfort of your home.
            </span>
          </div>
          <Line />
          <div />

          <StepNumber>3</StepNumber>
          <div className="h-12 flex flex-col">
            <span className="font-bold ">Prescription</span>
            <span className="text-sm">
              FREE medication and delivery in 2-3 business days.
            </span>
          </div>
          <Line />
          <div />

          <StepNumber>4</StepNumber>
          <div className="h-12 flex flex-col">
            <span className="font-bold ">Regular Check-ins</span>
            <span className="text-sm">
              Get refills, check in with your provider, and track your progress
              - all at your own pace.
            </span>
          </div>
          <div /> */}


          <div />
        </div>
      </div>
    </div>
  );
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mx-4">
      <div>
        <h1 className="text-3xl md:text-4xl text-center md:text-left">
          Our care process
        </h1>
      </div>
      <div className="md:-mt-8 grid grid-cols-2 space-y-16">
        <div className="flex justify-center  items-center px-4">
          <img src="/images/assessment.svg" className="mr-4 mt-12" />
        </div>
        <div className="max-w-xs">
          <h3 className="text-xl mb-4">Personalized Assessments</h3>
          <div className="opacity-70">
            In 10 minutes, we&apos;ll get to know you and suggest a provider
            that fits your unique needs.
          </div>
        </div>

        <div className="flex justify-center px-4">
          <img src="/images/appointment.svg" className="mr-4" />
        </div>
        <div className="max-w-xs">
          <h3 className="text-xl mb-4">Convenient Appointments</h3>
          <div className="opacity-70">
            Meet with a clinician from the comfort of your home.
          </div>
        </div>

        <div className="flex justify-center px-4">
          <img src="/images/prescription.svg" className="mr-4" />
        </div>
        <div className="max-w-xs">
          <h3 className="text-xl mb-4">Free Delivery</h3>
          <div className="opacity-70">
            FREE medicine delivery in 2-3 business days.
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCareProcess;
