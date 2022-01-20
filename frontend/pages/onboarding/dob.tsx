/**
 * Page asking for a date of birth if one was not provided elsewhere
 * in the flow. Not as relevant now that Google signup is not used
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
import { updateDob } from "../../lib/api";
import subYears from "date-fns/subYears";
import Button from "../../components/core/Button";

interface Props { }

const dateMask = [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/];

const DobPage: NextPage<Props> = () => {
  const [alert, setAlert] = useState<React.ReactElement>();
  const { onboarding } = useAppContext();
  const router = useRouter();

  const onError = (error: string) => {
    setAlert(<Alert error={error} onClick={() => setAlert(undefined)} />);
  };

  const onClick = (birthdate: Date) => {
    return updateDob(birthdate).then(() => {
      router.push("/onboarding/phone");
    });
  };

  return (
    <OnboardingContainer stage="dob" percent={75} title="Lina - Birthday">
      <div className="flex flex-col w-full px-8 lg:px-24">
        <div className="text-center text-xl font-semibold">
          What is your birthday?
        </div>
        <div className="text-center font-light mb-2">
          We need this for your patient record.
        </div>
        <div className="w-full mb-2">
          <Formik
            initialValues={{
              birthdate: "",
            }}
            validationSchema={Yup.object().shape({
              birthdate: Yup.date()
                .max(subYears(new Date(), 18), "Must be 18 or older")
                .required("Required")
                .typeError("Invalid Date"),
            })}
            onSubmit={(values) =>
              onClick(new Date(values.birthdate)).catch((e) =>
                onError(e.toString())
              )
            }
          >
            {({ errors, touched }) => (
              <Form>
                <div className="grid grid-cols-1 space-y-2">
                  <MaskedTextInput
                    type="text"
                    label="Date of Birth"
                    name="birthdate"
                    placeholder="mm/dd/yyyy"
                    mask={dateMask}
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

export default DobPage;
