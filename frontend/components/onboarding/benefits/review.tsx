/**
 * Show a testimonial for use in the onboarding flow specifically
 */
import React from "react";
import Stars from "../../landing/Stars";

interface Props { }

const Review: React.FC<Props> = () => {
  return (
    <>
      <Stars />
      <div className="mt-4">
        &ldquo;Lina has helped me though a tough time in my life with something
        I never thought I&apos;d be comfortable addressing. Thanks for the work
        you&apos;re doing.&rdquo;
      </div>
      <div className="mt-2 text-blueGray-500">Lina Member, Florida</div>
    </>
  );
};

export default Review;
