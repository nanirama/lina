/**
 * Component used to display FAQ on landing page and FAQ page.
 * Dynamically pulls list of states operated in from backend
 */

import React, { useState } from "react";
import styled from 'styled-components'
import Link from "next/link";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import FAQItem from "./FAQItem";
import Button from "../core/Button";
import { USState } from "../../../server/src/utils/states";
import { useEffect } from "react";
import { getStates } from "../../lib/api";

interface Props {
  title?: string;
  showButton?: boolean;
}

const FAQ: React.FC<Props> = ({ faq, title, showButton = true }) => {
  const [states, setStates] = useState<Array<USState>>([]);
  useEffect(() => {
    getStates().then(setStates);
  }, []);

  const stateList = states.map((s) => s.name);
  const stateEnding =
    stateList.slice(0, -1).join(", ") +
    " and " +
    stateList[stateList.length - 1];
  
const StyledFaq = styled.div`
width:100%;
display: flex;
flex-direction:column;
justify-content:center;
.ansclass-3{
  display: flex;
  flex-direction: column;
  justify-content:start;
  & > p{
    margin-bottom:15px;
  }
}
.ansclass-5{
  display: flex;
  flex-direction: column;
  justify-content:start;
  & > p{
    margin-bottom:10px;
  }
  & > h4{
    margin-bottom:10px;
    font-weight: 700;
  }
}
.ansclass-6{
  display: flex;
  flex-direction: column;
  justify-content:start;  
  & > p{
    margin-bottom:10px;
  }
}
`
  const answeredRendered = (ans, index)=>{
    return(
      <StyledFaq>
        <div className={`ansclass-${index+1}`}>
        {documentToReactComponents(ans)}
        </div>
      </StyledFaq>      
      );
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-3xl md:text-4xl text-center md:text-left mb-16">
        {title ? title : "FAQs"}
      </h1>
      <ul className="w-full space-y-8">
        { faq.map(({fields}, index)=>{
          return(
            <FAQItem title={fields.question} key={index}>
              {answeredRendered(fields.faqanswer, index)}
              {/* {documentToReactComponents(fields.faqanswer)} */}
            </FAQItem>  
          )
        })}
        {/* <FAQItem title="What is Lina?">
          <p>
            Lina allows patients to see licensed psychiatry professionals via an
            online video consultation. We enable greater access to high quality,
            convenient, and affordable psychiatric care.
          </p>
        </FAQItem>
        <FAQItem title="What is the cost?">
          <p className=" ">
            Your first month is just $5. Without insurance, membership is $95 a
            month. This includes visits with your provider. Your insurance may
            cover some of the costs of your medication.
          </p>
        </FAQItem>
        <FAQItem title="How does this work?">
          <div className="flex flex-col space-y-4  ">
            <p>
              1) Complete our brief assessment online so we can learn about your
              medical history. Based on this, we will assess whether we can help
              you.
            </p>
            <p>
              2) If you are a fit for our practice, you will be able to schedule
              an online visit. Please note that we are happy to take patients
              even if they have not been treated previously.
            </p>
            <p>
              3) Before your reservation is confirmed, you will need upload
              images of government-issued photo ID as well as fill out further
              intake information.
            </p>
            <p>
              4) A visit with Lina is much like a regular doctor visit, except
              that it is conducted digitally. We take cyber-security seriously;
              all visits are done via a secure, HIPAA-compliant videochat. The
              first visit is an online visit with a mental health expert.
            </p>
            <p>
              We do not cut corners or skip any important aspects of a full
              psychiatric evaluation; your provider will perform a full
              psychiatric evaluation. Our providers only prescribe medication if
              it is appropriate for your situation.
            </p>
          </div>
        </FAQItem>
        <FAQItem title="What states do you operate in?">
          <p>
            We currently operate in {stateEnding}. We&apos;re always trying to
            help as many people as possible. If your state is not listed here,
            please complete our online assessment and we&apos;ll prioritize you
            on our waitlist. We require proof of residency upon booking an
            appointment (a driver&apos;s license works).
          </p>
        </FAQItem>
        <FAQItem title="Do you accept insurance?">
          <div className="mb-2">
            The short answer is yes. 🙃 Here&apos;s the longer answer:
          </div>
          <p className="">
            <h4 className="font-bold">Visits</h4>
            Lina is an out-of-network provider with insurance companies for
            visits. An <b>out-of-network</b> claim means that your health
            insurance company can reimburse you for money spent on healthcare
            that is from a provider not normally covered in your
            insurance&apos;s network. Lina provides you with a superbill to
            submit to your insurance to cover visit fees.
            <h4 className="mt-4 font-bold">Medication</h4>
            You can use your insurance to pay for medication at your local
            pharmacy. If you want your prescription shipped, we charge $15 for
            all medication, with shipping included for free.
          </p>
        </FAQItem>
        <FAQItem title="Does Lina ship medications?">
          <p>
            Yes, Lina partners with mail order pharmacies to deliver medications
            at the lowest cost possible to our members.
          </p>
          <p className="mt-4">
            Our partner pharmacy is Ridgeway Pharmacy.
            <br />
            Contact Information:
            <br />
            Ridgeway Pharmacy, Closed Door
            <br />
            2824 Hwy 93 N<br />
            Victor, MT 59875-0000
            <br />
            Name of PIC: Klinton K. Curtis
            <br />
            Professional Degree of PIC: Registered Pharmacist
          </p>
        </FAQItem>
        <FAQItem title="Are you HIPAA compliant?">
          <p>
            We take all security and privacy issues very seriously. The Lina
            platform is fully HIPAA compliant. All patient data and messages are
            strictly confidential. Please see our{" "}
            <Link href="/privacy-policy">
              <a className="underline hover:no-underline" href="#">
                Privacy Policy
              </a>
            </Link>{" "}
            for more information.
          </p>
        </FAQItem>
        <FAQItem title="What qualifications do your providers have?">
          <p>
            All of our providers are licensed to practice medicine in the United
            States and are board-certified in various areas of specialty such as
            psychiatry and family medicine.
          </p>
          <p>
            Our nurse practitioners and physician’s assistants are also all
            licensed or certified in the states in which they provide patient
            care.
          </p>
        </FAQItem>
        <FAQItem title="Can I pick my provider?">
          Yes! We think it&apos;s important you find a provider that you can
          feel comfortable speaking with. It&apos;s important to
          &quot;click&quot; with your provider.
        </FAQItem>
        <FAQItem title="Are there conditions that you don’t cover?">
          At this time, we cannot treat addiction, bipolar disorder or
          schizophrenia.
        </FAQItem>
        <FAQItem title="Can I see my provider in-person?">
          At this time, we are online-only.
        </FAQItem>
        <FAQItem title="What is included in my subscription? How often can I see my provider?">
          Your subscription includes unlimited visits to your provider,
          unlimited messaging with your provider and care team. Your insurance
          may cover some of the costs of your medication.
        </FAQItem>
        <FAQItem title="What is your rescheduling policy?">
          <p className=" ">
            Please give us 48 hours notice for any cancellations or reschedules.
          </p>
        </FAQItem>
        <FAQItem title="What happens if I am late to my appointment?">
          If you are late to your appointment by more than 15 minutes, we will
          will count this as an appointment cancellation.
        </FAQItem> */}
      </ul>
      {showButton ? (
        <Link href="/faq">
          <Button
            asLink={true}
            href="#"
            buttonType="secondary"
            className="mt-8 w-full md:w-max text-center border border-darkGray border-1 hover:bg-darkGray hover:text-white"
          >
            Get answers to other questions
          </Button>
        </Link>
      ) : null}
    </div>
  );
};

export default FAQ;
