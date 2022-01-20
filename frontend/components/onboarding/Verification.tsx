/**
 * Wrapper around Persona's client SDK
 */
import React, { useEffect, useState } from "react";
import Persona from "persona";

interface Props {
  onComplete: (inquiryId: string) => any;
}

const Verification: React.FC<Props> = ({ onComplete }) => {
  const [personaClient, setPersonaClient] = useState();
  useEffect(() => {
    // @ts-ignore
    const client = new Persona.Client({
      templateId: "tmpl_TesGaorQEQ8mUEHsSQxcmL9M",
      environment:
        process.env.NODE_ENV === "production" ? "production" : "sandbox",
      onLoad: (_error) => client.open(),
      onComplete,
    });
    setPersonaClient(client);
  }, []);

  return <div></div>;
};

export default Verification;
