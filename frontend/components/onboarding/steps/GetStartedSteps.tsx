/**
 * Component used to display Neil's story and information about Lina
 * early in the intake flow
 */
import React from "react";
import { useAppContext } from "../../../context/AppContext";
import Button from "../../core/Button";

interface Props {
  next: () => any;
}

const GetStartedSteps: React.FC<Props> = ({ next }) => {
  const { onboarding } = useAppContext();
  const introHeaderText = onboarding.firstName
    ? `Welcome to Lina ${onboarding.firstName}!`
    : "Welcome to Lina.";
  return (
    <>
      <img
        src="/images/neil.jpeg"
        className="rounded-full mx-auto w-16 h-16 border border-4"
      />
      <h1 className="text-2xl my-4 text-center">{introHeaderText}</h1>
      <div className="flex flex-col space-y-4 text-sm mb-4 ">
        <p>
          The first step in our process is collecting online intake information
          so that we can find an approach that best meets your needs. Don&apos;t
          worry - it won&apos;t take more than a few minutes!
        </p>

        <p>
          I founded Lina because I struggled with my mental health for years
          before finally seeking care. I know how hard it can be to find the
          right psychiatrist, particularly if you aren&apos;t feeling well!
        </p>

        <p>
          My promise to you is to give you psychiatric care when you need it
          most. I don&apos;t want others to suffer from a lack of access like I
          did. If at any time our service is not exactly what you wanted, please
          email me at{" "}
          <a
            className="underline hover:no-underline"
            href="mailto:neil@hellolina.com"
          >
            neil@hellolina.com
          </a>
          .
        </p>

        <div>
          Sincerely,
          <br />
          Neil G - Lina CEO
        </div>
        <div className="hidden space-x-4 justify-center items-center my-8">
          <img src="/images/questionnaire.svg" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
          <img src="/images/results.svg" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
          <img src="/images/treatment.svg" />
        </div>
      </div>
      <Button className="w-full mb-8" onClick={next}>
        Get Started
      </Button>
    </>
  );
};

export default GetStartedSteps;
