/**
 * Page that asks for lead information (name, email, phone, DOB)
 */
import { Formik, Form } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import OnboardingContainer from "../../../components/onboarding/OnboardingContainer";
import { MaskedTextInput, TextInput, useAuth } from "@healthgent/common";
import { useAppContext } from "../../../context/AppContext";
import { useRouter } from "next/router";
import { capitalize, formatPhoneNumber } from "../../../lib/util";
import { identifyUser, logEvent } from "../../../lib/event_logging";
import { submitStartIntake } from "../../../lib/api";
import Alert from "../../../components/core/Alert";
import subYears from "date-fns/subYears";
import Button from "../../../components/core/Button";
import { NextPage } from "next";
import Benefits from "../../../components/onboarding/benefits/Benefits";
import Review from "../../../components/onboarding/benefits/review";

const phoneNumberMask = [
  "(",
  /[1-9]/,
  /\d/,
  /\d/,
  ")",
  " ",
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

const dateMask = [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/];

interface Props {
  intakeId: string;
}

const Name: NextPage<Props> = ({ intakeId }) => {
  const [alert, setAlert] = useState<React.ReactElement>();
  const { onboarding } = useAppContext();
  const { login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    logEvent("start-lead");
    if (intakeId && !onboarding.intakeId) {
      onboarding.setIntakeId(intakeId);
    }
  }, []);

  const finalIntakeId = onboarding.intakeId || intakeId;

  const onClick = async (
    firstName: string,
    lastName: string,
    phone: string,
    birthdate: Date
  ) => {
    setAlert(undefined);
    onboarding.setFirstName(firstName);
    onboarding.setLastName(lastName);
    onboarding.setPhone(phone);
    onboarding.setBirthdate(birthdate);
    identifyUser({ phone, firstName, lastName });
    await submitStartIntake({
      phone,
      firstName,
      lastName,
      intakeId: finalIntakeId,
    });
    logEvent("lead");
    router.push("/onboarding/complete/signup");
  };

  const onError = (error: string) => {
    setAlert(<Alert error={error} onClick={() => setAlert(undefined)} />);
  };

  return (
    <OnboardingContainer title="Lina - Name" stage="registration" percent={85}>
      <div className="w-full max-w-xl">
        <h1 className="text-2xl mb-2 text-center">
          Before we get started, please tell us a bit about yourself.
        </h1>
        <div className="w-full text-sm mb-4 items-center text-center font-light">
          We do not share this information with anyone &mdash; creating an
          account will let you get in touch with providers who can help.
        </div>
        {/* <div className="text-sm leading-none mb-4 text-center">
          We will follow up on your quiz results here.
        </div> */}
        <div className="w-full mb-2">
          <Formik
            initialValues={{
              phone: onboarding.phone,
              firstName: onboarding.firstName,
              lastName: onboarding.lastName,
              birthdate: "",
            }}
            validationSchema={Yup.object().shape({
              firstName: Yup.string()
                .min(2, "Please enter your first name")
                .required("Required"),
              lastName: Yup.string()
                .min(2, "Please enter your last name")
                .required("Required"),
              phone: Yup.string()
                .transform((v, s) => formatPhoneNumber(s))
                .min(9, "Please enter a valid phone number")
                .required("Required"),
              birthdate: Yup.date()
                .max(subYears(new Date(), 18), "Must be 18 or older")
                .required("Required")
                .typeError("Invalid Date"),
            })}
            onSubmit={(values) =>
              onClick(
                capitalize(values.firstName),
                capitalize(values.lastName),
                values.phone,
                new Date(values.birthdate)
              ).catch((e) => onError(e.toString()))
            }
          >
            {({ errors, touched }) => (
              <Form>
                <div className="grid grid-cols-2 space-x-2 mb-2">
                  <TextInput
                    type="text"
                    label="First Name"
                    name="firstName"
                    placeholder="First Name"
                  />
                  <TextInput
                    type="text"
                    label="Last Name"
                    name="lastName"
                    placeholder="Last Name"
                  />
                </div>
                <MaskedTextInput
                  type="text"
                  label="Date of Birth"
                  name="birthdate"
                  placeholder="mm/dd/yyyy"
                  mask={dateMask}
                />
                <MaskedTextInput
                  type="text"
                  label="Phone Number"
                  name="phone"
                  placeholder="Phone"
                  mask={phoneNumberMask}
                />
                {alert}
                <Button className="mt-4 w-full" type="submit">
                  Continue
                </Button>
              </Form>
            )}
          </Formik>
        </div>
        <div className="mt-8 mx-4 text-center text-sm flex flex-col items-center justify-center">
          <Review />
        </div>
        <div className="mx-8 mt-8 flex justify-center">
          <Benefits />
        </div>
      </div>
    </OnboardingContainer>
  );
};

Name.getInitialProps = ({ query }) => {
  const intakeId = query.intakeId as string;
  return { intakeId };
};

export default Name;
