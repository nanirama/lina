/**
 * Step where we ask for the user's first name in order
 * to customize the intake flow
 */
import { Form, Formik } from "formik";
import * as Yup from "yup";
import React from "react";
import { useAppContext } from "../../../context/AppContext";
import { capitalize } from "../../../lib/util";
import { TextInput } from "@healthgent/common";
import Button from "../../core/Button";
import Link from "next/link";

interface Props {
  next: () => unknown;
}

const NameStep: React.FC<Props> = ({ next }) => {
  const { onboarding } = useAppContext();
  const onComplete = (name: string) => {
    onboarding.setFirstName(capitalize(name).trim());
    next();
  };
  return (
    <div className="text-center">
      <h1 className="text-2xl mb-1">What&apos;s your first name?</h1>
      <div className="mb-4 text-xs">
        We&apos;ll use this to personalize your experience.
      </div>
      <div className="w-full mb-4">
        <Formik
          initialValues={{ firstName: "" }}
          validationSchema={Yup.object().shape({
            firstName: Yup.string().required(),
          })}
          onSubmit={(values) => onComplete(values.firstName)}
        >
          {({ errors, touched }) => (
            <Form>
              <TextInput
                hideError
                type="text"
                name="firstName"
                label=""
              ></TextInput>
              <Button type="submit" className="mt-4 w-full">
                Continue
              </Button>
            </Form>
          )}
        </Formik>
      </div>
      <Link href="/login">
        <a href="#" className="underline hover:no-underline">
          Already have an account?
        </a>
      </Link>
    </div>
  );
};

export default NameStep;
