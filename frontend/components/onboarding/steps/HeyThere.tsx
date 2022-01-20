/**
 * Shows a waving hand emoji for intake flow
 */
import React, { useEffect } from "react";

interface Props {
  next: () => unknown;
}

const HeyThere: React.FC<Props> = ({ next }) => {
  useEffect(() => {
    setTimeout(() => {
      next();
    }, 2000);
  }, []);
  return (
    <>
      <div className="flex items-center justify-center">
        <h1 className="text-4xl mb-2 text-center">
          Hey there! <span className="wave">👋</span>
        </h1>
      </div>
    </>
  );
};

export default HeyThere;
