/**
 * Page shown after Lina has received a lead, asking the user to create
 * an account
 */
import { Formik, Form } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import OnboardingContainer from "../../../components/onboarding/OnboardingContainer";
import { PasswordStrength, TextInput, useAuth } from "@healthgent/common";
import { useAppContext } from "../../../context/AppContext";
import { useRouter } from "next/router";
import CheckboxInput from "@healthgent/common/src/forms/CheckboxInput";
import Alert from "../../../components/core/Alert";
import { register } from "../../../lib/api";
import { identifyUser, logEvent } from "../../../lib/event_logging";
import Link from "next/link";
import Button from "../../../components/core/Button";
import {getTimezoneName, normalizeDateToUTC} from "../../../lib/util";

interface Props { }

const Signup: React.FC<Props> = () => {
  const { onboarding, initialParams } = useAppContext();
  const router = useRouter();
  const { login } = useAuth();
  const [alert, setAlert] = useState<React.ReactElement>();
  const [showLogin, setShowLogin] = useState<boolean>(false);

  const onComplete = (email: string) => {
    logEvent("create-account");
    onboarding.setNotification(
      `We've sent an email to ${email} to verify it's you`
    );
    router.push("/onboarding/complete/account-created");
  };

  const onError = (error: string) => {
    setAlert(<Alert error={error} onClick={() => setAlert(undefined)} />);
  };

  const onClick = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setShowLogin(false);
    onboarding.setEmail(email);
    const { firstName, lastName, phone, intakeId, birthdate, residenceState } =
      onboarding;
    const timezone = getTimezoneName();
    return register({
      firstName,
      lastName,
      phone,
      email,
      password,
      intakeId,
      birthdate: normalizeDateToUTC(birthdate),
      userReferrer: initialParams,
      residenceState,
      timezone,
    })
      .then((t) => login(t))
      .then(() => identifyUser({ phone, firstName, lastName, email }))
      .then(() => onComplete(email))
      .catch((e) => {
        if (e.statusCode === 409) {
          // This is an existing user
          logEvent("already-registered");
          setShowLogin(true);
        } else {
          onError(e.toString());
        }
      });
  };
  return (
    <OnboardingContainer title="Lina - Name" stage="registration" percent={85}>
      <div className="w-full max-w-xl">
        <h1 className="text-2xl mb-4 text-center">Create your free account</h1>
        <div className="text-sm leading-none mb-4 text-center">
          <div className="mb-2">
            Let&apos;s set up your account so you can securely access your
            results anytime, anywhere.
          </div>
          {/* Please enter a password for your account. */}
        </div>
        <div className="w-full mb-2">
          <Formik
            initialValues={{
              email: onboarding.email,
              firstName: onboarding.firstName,
              lastName: onboarding.lastName,
              consent: true,
              password: "",
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email("Invalid email").required("Required"),
              password: Yup.string()
                .min(8, "Password must be at least 8 characters long")
                .matches(
                  /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).*.{8}$/,
                  "Password must contain an uppercase letter, lowercase letter, and number."
                )
                .required("Required"),
              consent: Yup.bool().oneOf(
                [true],
                "Accepting Terms & Conditions is required"
              ),
            })}
            onSubmit={(values) => onClick(values)}
          >
            {({ values, touched, isValid, isSubmitting }) => (
              <Form className="flex flex-col space-y-3">
                <TextInput
                  name="email"
                  label="Email "
                  type="email"
                  placeholder="Email 💌"
                />
                <div>
                  <TextInput
                    type="password"
                    label="Password "
                    name="password"
                    placeholder="Password 🔑"
                    hideError={true}
                  />
                  <PasswordStrength
                    password={
                      touched.password ? values.password || "" : undefined
                    }
                  />
                </div>
                <CheckboxInput label="s" name="consent">
                  I agree to the Lina{" "}
                  <a
                    href="/terms-of-service"
                    className="underline"
                    target="_blank"
                  >
                    terms of service
                  </a>
                  ,{" "}
                  <a
                    className="underline"
                    href="/privacy-policy"
                    target="_blank"
                  >
                    privacy policy
                  </a>
                  ,{" "}
                  <a
                    className="underline"
                    href="/telehealth-consent"
                    target="_blank"
                  >
                    consent to telehealth
                  </a>
                  , and SMS updates.
                </CheckboxInput>
                {alert}
                {showLogin ? (
                  <div className="my-2 text-md text-red-500">
                    There is already an account associated with this email
                    address. Please{" "}
                    <Link href="/login">
                      <a href="#" className="underline">
                        click here
                      </a>
                    </Link>{" "}
                    to login.
                  </div>
                ) : null}
                <Button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  processing={isSubmitting}
                >
                  Continue
                </Button>
              </Form>
            )}
          </Formik>
        </div>
        <div className="mt-8 text-blueGray-500 text-xs grid grid-cols-2 text-center">
          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            All data is secured using industry-leading encryption standards.
          </div>
          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            Your personal information stays private on our HIPAA compliant
            platform.
          </div>
        </div>
        {/* <div className="flex flex-col items-center text-blueGray-500">
          <HipaaLogo />
        </div> */}
      </div>
    </OnboardingContainer>
  );
};

export default Signup;
