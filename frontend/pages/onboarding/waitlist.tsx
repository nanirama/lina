/**
 * Page to display an email intake for users who want to join
 * the waitlist
 */
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import React, { useState } from "react";
import OnboardingContainer from "../../components/onboarding/OnboardingContainer";
import { joinWaitlist } from "../../lib/api";
import Link from "next/link";
import { logEvent } from "../../lib/event_logging";
import { useAppContext } from "../../context/AppContext";
import Button from "../../components/core/Button";
import { TextInput } from "@healthgent/common";

interface Props { }

const Waitlist: React.FC<Props> = () => {
  const router = useRouter();
  const { onboarding } = useAppContext();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (email: string) => {
    joinWaitlist(email, onboarding.residenceState).then(() =>
      setSubmitted(true)
    );
  };
  if (submitted) {
    logEvent("join-waitlist");
    return (
      <OnboardingContainer
        stage="pre-screen"
        percent={10}
        title="Lina - Join our waitlist"
      >
        <div className="text-xl text-center mt-4">
          Thanks! We&apos;ll stay in touch and let you know when we&apos;re
          available in your state.
          <Link href="/">
            <Button className="w-full mt-4">Back to homepage</Button>
          </Link>
        </div>
      </OnboardingContainer>
    );
  }
  return (
    <OnboardingContainer
      stage="pre-screen"
      percent={10}
      title="Lina - Join our waitlist"
    >
      <div className="flex flex-col px-8 lg:px-24 items-center">
        <h1 className="text-2xl text-center">
          We are not currently available in your state.
        </h1>
        <div className="text-md text-semibold mb-2 text-center">
          Please enter your email below to be notified when we offer treatment
          in your state.
        </div>
        <Formik
          initialValues={{ email: "" }}
          validationSchema={Yup.object().shape({
            email: Yup.string().email("Invalid email").required("Required"),
          })}
          onSubmit={(values) => onSubmit(values.email)}
        >
          {({ errors, touched }) => (
            <Form className="w-full">
              <TextInput name="email" label="Email" type="email" />
              <Button className="mt-4 w-full" type="submit">
                Join Waitlist
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </OnboardingContainer>
  );
};

export default Waitlist;
