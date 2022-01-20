/**
 * Page that just asks for a phone number.
 * Not as relevant now that google signup isn't used anymore
 */
import { MaskedTextInput, TextInput, useAuth } from "@healthgent/common";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Alert from "../../components/core/Alert";
import OnboardingContainer from "../../components/onboarding/OnboardingContainer";
import { useAppContext } from "../../context/AppContext";
import { formatPhoneNumber } from "../../lib/util";
import { updatePhone } from "../../lib/api";
import Button from "../../components/core/Button";

interface Props { }

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

const PhonePage: NextPage<Props> = () => {
  const [alert, setAlert] = useState<React.ReactElement>();
  const { onboarding } = useAppContext();
  const router = useRouter();

  const onError = (error: string) => {
    setAlert(<Alert error={error} onClick={() => setAlert(undefined)} />);
  };

  const onClick = (phone: string) => {
    return updatePhone(phone).then(() => {
      router.push("/onboarding/intake-questions");
    });
  };
  return (
    <OnboardingContainer stage="phone" percent={75} title="Lina - Phone Number">
      <div className="flex flex-col w-full px-8 lg:px-24">
        <div className="text-center text-xl font-semibold">
          What is your phone number?
        </div>
        <div className="text-center font-light mb-2">
          We will send you appointment reminders and shipping updates here.
        </div>
        <div className="w-full mb-2">
          <Formik
            initialValues={{
              phone: onboarding.phone,
            }}
            validationSchema={Yup.object().shape({
              phone: Yup.string()
                .transform((v, s) => formatPhoneNumber(s))
                .min(9, "Please enter a valid phone number")
                .required("Required"),
            })}
            onSubmit={(values) =>
              onClick(values.phone).catch((e) => onError(e.toString()))
            }
          >
            {({ errors, touched }) => (
              <Form>
                <div className="grid grid-cols-1 space-y-2">
                  <MaskedTextInput
                    type="text"
                    label="Phone Number"
                    name="phone"
                    placeholder="Phone"
                    mask={phoneNumberMask}
                  />
                  {alert}
                  <Button className="mt-2 w-full" type="submit">
                    Continue
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </OnboardingContainer>
  );
};

export default PhonePage;
