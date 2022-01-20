/**
 * component to say hi to the user by name and show a welcoming image
 */
import Image from "next/image";
import React, { useEffect } from "react";
import { useAppContext } from "../../../context/AppContext";

interface Props {
  next: () => unknown;
}

const WelcomeStep: React.FC<Props> = ({ next }) => {
  const { onboarding } = useAppContext();
  useEffect(() => {
    setTimeout(() => {
      next();
    }, 4000);
  }, []);
  return (
    <>
      <h1 className="text-2xl mb-2 text-center">
        Nice to meet you, {onboarding.firstName}!
      </h1>
      <div className="flex items-center justify-center">
        <Image
          src="/images/animation_wink.gif"
          layout="intrinsic"
          height="140"
          width="140"
        />
      </div>
    </>
  );
};

export default WelcomeStep;
