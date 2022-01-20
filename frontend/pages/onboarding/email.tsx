/**
 * Page that just asks for an email.
 * Currently unused?
 */
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import OnboardingContainer from "../../components/onboarding/OnboardingContainer";
import { useAppContext } from "../../context/AppContext";
import { identifyUser, logEvent } from "../../lib/event_logging";
import { TextInput } from "@healthgent/common";
import Button from "../../components/core/Button";

interface Props { }

const EmailOnboarding: React.FC<Props> = () => {
  const router = useRouter();
  const { onboarding } = useAppContext();
  const { setEmail } = onboarding;

  useEffect(() => {
    logEvent("start-email");
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onClick = (email: string) => {
    identifyUser({ email });
    // submitStartIntake(email);
    // logEvent("lead");
    // setEmail(email);
    router.push("/onboarding/questionnaire");
  };
  return (
    <OnboardingContainer stage="pre-screen" percent={12} title="Lina - Email">
      <div className="w-full max-w-xl">
        <div className="text-2xl font-semibold leading-none mb-4 text-center">
          What is your email address?
        </div>
        <div className="text-sm leading-none mb-4 text-center">
          We will follow up on your quiz results here.
        </div>
        <div className="w-full mb-2">
          <Formik
            initialValues={{ email: "" }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email("Invalid email").required("Required"),
            })}
            onSubmit={(values) => onClick(values.email)}
          >
            {({ errors, touched }) => (
              <Form>
                <TextInput name="email" label="" type="email" />
                <Button
                  className="mt-2 w-full"
                  // disabled={!email}
                  // onClick={onClick}
                  type="submit"
                >
                  Continue
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </OnboardingContainer>
  );
};

export default EmailOnboarding;
