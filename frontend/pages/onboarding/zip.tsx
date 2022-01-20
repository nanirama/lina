/**
 * Page asking for the patient's zip code.
 * Currently unused?
 */
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import OnboardingContainer from "../../components/onboarding/OnboardingContainer";
import { useAppContext } from "../../context/AppContext";
import { logEvent } from "../../lib/event_logging";
import { TextInput } from "@healthgent/common";
import { checkZip } from "../../lib/api";
import Notification from "../../components/core/Notification";
import Button from "../../components/core/Button";

interface Props { }

const ZipOnboarding: React.FC<Props> = () => {
  const [showNotification, setShowNotification] = useState(false);
  const router = useRouter();
  const { onboarding } = useAppContext();
  const { setZipCode } = onboarding;

  useEffect(() => {
    logEvent("start-zip");
  }, []);

  useEffect(() => {
    if (showNotification) {
      setTimeout(() => {
        setShowNotification(false);
      }, 1250);
    }
  }, [showNotification]);

  const onClick = (zip: string) => {
    checkZip(zip).then((available) => {
      if (available) {
        setZipCode(zip);
        setShowNotification(true);
        // TODO(sbb); Add this
        // router.push("");
      } else {
        logEvent("ineligible");
        router.push("/onboarding/waitlist");
      }
    });
  };
  return (
    <OnboardingContainer
      stage="pre-screen"
      percent={12}
      title="Lina - Zip Code"
    >
      <div className="absolute t-0 w-full px-4">
        <Notification
          title="Sweet! We're available in your state"
          show={showNotification}
          onClose={() => setShowNotification(false)}
          showClose={false}
        />
      </div>
      <div className="w-full max-w-xl">
        <div className="text-2xl font-semibold leading-none mb-4 text-center">
          What is your zip code?
        </div>
        <div className="text-sm leading-none mb-4 text-center">
          Let&apos;s check if Lina is available in your area.
        </div>
        <div className="w-full mb-2">
          <Formik
            initialValues={{ zip: "" }}
            validationSchema={Yup.object().shape({
              zip: Yup.string()
                .required("Required")
                .matches(/^[0-9]+$/, "ZIP code must only contain digits")
                .min(5, "ZIP code must be 5 digits")
                .max(5, "ZIP code must be 5 digits"),
            })}
            onSubmit={(values) => onClick(values.zip)}
          >
            {({ errors, touched }) => (
              <Form>
                <TextInput name="zip" label="Zip Code" type="text" />
                <Button className="mt-2 w-full" type="submit">
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

export default ZipOnboarding;
