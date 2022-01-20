/**
 * Used to display quiz results after registration.
 */
import { IntakeEvaluationResponse } from "@healthgent/server/src/lib/api_types";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Button from "../../components/core/Button";
import Modal from "../../components/core/Modal";
import OnboardingContainer from "../../components/onboarding/OnboardingContainer";
import ScoreDisplay from "../../components/onboarding/quiz/ScoreDisplay";
import Spinner from "../../components/svg/Spinner";
import { useAppContext } from "../../context/AppContext";
import { checkIntake } from "../../lib/api";
import { logEvent } from "../../lib/event_logging";

interface Props {
  intakeId: string;
}

const PendingResults = () => {
  return (
    <div className="px-4">
      <h1 className="text-center text-2xl mb-2">
        Hang tight! We&apos;re almost done.
      </h1>
      <div className="text-center text-sm mb-6">
        We&apos;re finding the best treatment options and providers for you.
      </div>
      <div className="text-coral w-16 h-16 justify-center mx-auto">
        <Spinner />
      </div>
    </div>
  );
};

const QualifiedResults: React.FC<{
  onClick: () => any;
  intakeEvaluation: IntakeEvaluationResponse;
  firstName: string;
}> = ({ onClick, intakeEvaluation, firstName }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="flex flex-col mx-auto items-center max-w-4xl px-4">
      <Modal
        show={showModal}
        title="How are these calculated?"
        onClose={() => setShowModal(false)}
      >
        <div className="my-4 px-8 text-sm text-left">
          The scores reflect 3 common screening questionnaires:
          <ol className="my-2 ml-6 list-disc">
            <li>
              Patient Health Questionnaire-9 <br />
              (PHQ-9)
            </li>
            <li>
              General Anxiety Disorder-7 <br />
              (GAD-7)
            </li>
          </ol>
          These assessments are not a replacement for a visit with a qualified
          medical practitioner, and are not intended to be the sole method of
          diagnosis.
        </div>
      </Modal>
      <div className="text-center font-semibold text-2xl">
        {firstName ? `${firstName}, we can help.` : "We can help."}
      </div>
      <div className="w-full my-2 flex flex-col space-y-4 border rounded-xl p-4">
        <div className="text-center text-xl">Preliminary screen indicators</div>
        {intakeEvaluation.anxiety !== undefined ? (
          <ScoreDisplay
            title="Anxiety"
            percent={intakeEvaluation.anxiety.percent}
            level={intakeEvaluation.anxiety.level}
          />
        ) : null}
        {intakeEvaluation.depression !== undefined ? (
          <ScoreDisplay
            title="Depression"
            percent={intakeEvaluation.depression.percent}
            level={intakeEvaluation.depression.level}
          />
        ) : null}
        {/* <div className={"h-4 bg-black"} style={{ width: "1px" }}></div> */}
        <button
          className="text-xs underline active:no-underline hover:no-underline"
          onClick={() => setShowModal(true)}
        >
          How are these calculated?
        </button>
      </div>
      <Button onClick={onClick} className="w-full">
        Continue
      </Button>
      {/* <div className="p-4 border rounded-xl">
        <div className="text-center font-semibold text-lg">
          The right medication can make all the difference
        </div>
        <div className="text-md my-4 text-center">
          Get a personalized prescription, medication delivery, and unlimited
          messaging and check-ins with your provider, all from the comfort of
          your home. $45 for your first month, then just $95 a month after that.
        </div>
        <Button>
          Get Treatment Now
        </Button>
      </div> */}
    </div>
  );
};

const Results: NextPage<Props> = ({ intakeId }) => {
  const router = useRouter();
  const { onboarding } = useAppContext();
  const [showResult, setShowResult] = useState(false);
  const [response, setResponse] = useState<IntakeEvaluationResponse>();

  useEffect(() => {
    logEvent("view-results");
    checkIntake(intakeId)
      .then((response) => {
        if (response.qualification === "HG_YES") {
          logEvent("eligible");
          setResponse(response);
          setTimeout(() => {
            setShowResult(true);
          }, 2500);
        } else {
          logEvent("ineligible");
          router.push("/onboarding/questionnaire-review");
        }
      })
      .catch((e) => {
        logEvent("intake-error");
        router.push("/onboarding/questionnaire-review");
      });
  }, []);

  return (
    <OnboardingContainer
      stage="checkout"
      percent={85}
      title="Lina - Questionnaire Results"
    >
      {showResult ? (
        <QualifiedResults
          onClick={() => router.push(`/onboarding/schedule`)}
          intakeEvaluation={response as IntakeEvaluationResponse}
          firstName={onboarding.firstName}
        />
      ) : (
        <PendingResults />
      )}
    </OnboardingContainer>
  );
};

Results.getInitialProps = ({ query }) => {
  const intakeId = query.intakeId as string;
  return { intakeId };
};

export default Results;
