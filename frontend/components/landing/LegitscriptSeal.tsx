/**
 * Displays the legit script seal with an <img>
 */
import React from "react";

interface Props { }

const LegitscriptSeal: React.FC<Props> = () => {
  return (
    <a
      href="https://legitscript.com/pharmacy/hellolina.com"
      target="_blank"
      title="Verify LegitScript Approval"
      rel="noreferrer"
    >
      <img
        src="https://static.legitscript.com/seals/10768692.png"
        alt="LegitScript approved"
        width="140"
        height="100"
      />
    </a>
  );
};

export default LegitscriptSeal;
