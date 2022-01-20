/**
 * Form used to collect information for registration.
 */
import cx from "classnames";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { PasswordStrength, useAuth } from "@healthgent/common";
import Alert from "../core/Alert";
import TextInput from "@healthgent/common/src/forms/TextInput";
import { formatPhoneNumber } from "../../lib/util";
import PhoneInput from "@healthgent/common/src/forms/PhoneInput";
import CheckboxInput from "@healthgent/common/src/forms/CheckboxInput";
import { UserRegistration } from "@healthgent/server/src/lib/api_types";

interface Props {
  handleSubmit: (
    registration: Omit<UserRegistration, "intakeId" | "residenceState">
  ) => Promise<any>;
  intakeId: string;
  initialValues: {
    email: string;
  };
}

const Signup: React.FC<Props> = ({ handleSubmit, intakeId, initialValues }) => {
  const [error, setError] = useState("");

  return (
    <div className="flex flex-col w-full max-w-3xl px-4">
      <div className="text-xl font-semibold text-center mb-2">
        Create an account to save your progress
      </div>
      <div className="w-full text-sm mt-2 items-center text-center font-light">
        We do not share this information with anyone &mdash; we want to make
        sure that you can get the best care possible.
      </div>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: initialValues.email,
          phone: "",
          password: "",
          birthdate: "",
          consent: false,
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          lastName: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          phone: Yup.string()
            .transform((v, s) => formatPhoneNumber(s))
            .min(9, "Please enter a valid phone number")
            .required("Required"),
          password: Yup.string()
            .min(8, "Password must be at least 8 characters long")
            //(?=.*[!@#$&*])
            .matches(
              /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).*.{8}$/,
              "Password must contain an uppercase letter, lowercase letter, and number."
            )
            .required("Required"),
          birthdate: Yup.string()
            .min(8, "Please enter your birthday in mm/dd/yyyy format.")
            .required("Required"),
          consent: Yup.bool().oneOf(
            [true],
            "Accepting Terms & Conditions is required"
          ),
        })}
        onSubmit={(values) => {
          handleSubmit(values).catch((e) => setError(e.toString()));
        }}
      >
        {({ values, errors, touched, isValid }) => (
          <Form className="space-y-2">
            <div className="grid grid-cols-2 space-x-2">
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

            <TextInput
              type="date"
              label="Birthday"
              name="birthdate"
              placeholder="mm/dd/yyyy"
            />

            <TextInput
              type="email"
              label="Email"
              name="email"
              placeholder="Email"
            />
            <PhoneInput
              type="text"
              label="Phone Number"
              name="phone"
              placeholder="Phone"
            />
            <div>
              <TextInput
                type="password"
                label="Password"
                name="password"
                placeholder="Password"
                hideError={true}
              />
              <PasswordStrength
                password={touched.password ? values.password || "" : undefined}
              />
            </div>
            <CheckboxInput label="s" name="consent">
              I consent to the Lina{" "}
              <a href="/terms-of-service" className="underline" target="_blank">
                terms of service
              </a>
              ,{" "}
              <a className="underline" href="/privacy-policy" target="_blank">
                privacy policy
              </a>
              , and{" "}
              <a
                className="underline"
                href="/telehealth-consent"
                target="_blank"
              >
                consent to telehealth
              </a>
              .
            </CheckboxInput>
            {error ? (
              <Alert error={error} onClick={() => setError("")} />
            ) : null}
            <button
              type="submit"
              className={cx("w-full", {
                "primary-button-blue": isValid,
                "primary-button-disabled": !isValid,
              })}
              disabled={!isValid}
            >
              Continue
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
