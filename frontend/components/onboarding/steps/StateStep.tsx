/**
 * Step to ask for the user's state, and redirect them to the waitlist
 * if they are signing up from a state that is not eligible
 */
import React from "react";
import { useAppContext } from "../../../context/AppContext";
import { getStates } from "../../../lib/api";
import Button from "../../core/Button";
import StateInput from "../quiz/StateInput";

interface Props {
  next: () => unknown;
  onIneligible: () => unknown;
}

const StateStep: React.FC<Props> = ({ next, onIneligible }) => {
  const { onboarding } = useAppContext();
  const { residenceState, setResidenceState } = onboarding;

  const onClick = () => {
    getStates().then((enabledStates) => {
      const isEligible = enabledStates.find(
        (s) => s.abbreviation === residenceState
      );
      if (isEligible) {
        next();
      } else {
        onIneligible();
      }
    });
  };
  return (
    <div className="w-full max-w-xl">
      <h1 className="text-2xl mb-2 text-center mx-2">
        What state are you located in?
      </h1>
      <div className="mb-4">
        We need to check if we can match you with a provider licensed in your
        state.
      </div>
      <div className="w-full mb-2">
        <StateInput onChange={setResidenceState} value={residenceState} />
      </div>
      <Button disabled={!residenceState} onClick={onClick} className="w-full">
        Continue
      </Button>
    </div>
  );
};

export default StateStep;
