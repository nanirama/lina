/**
 * Small explainer for the user saying the quiz is a preliminary screen
 */
import React from "react";
import Button from "../../core/Button";

interface Props {
  next: () => any;
}

const ReadyGetStarted: React.FC<Props> = ({ next }) => {
  const introHeaderText = "Ready to get started?";
  return (
    <>
      <h1 className="text-2xl font-semibold leading-none mb-4 text-center">
        {introHeaderText}
      </h1>
      <div className="text-lg leading-relaxed mb-4 text-center">
        The following questions serve as a preliminary screen to establish
        whether medication is the right course of treatment for you. Please
        answer as accurately as possible, since your answers will determine the
        type of care we suggest.
      </div>
      <Button className="w-full" onClick={next}>
        Continue
      </Button>
    </>
  );
};

export default ReadyGetStarted;
