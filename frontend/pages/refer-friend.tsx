/**
 * Page used to refer a friend/generate auth codes
 */
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { NextPage } from "next";
import React, { useEffect, useRef, useState } from "react";
import { TextInput } from "@healthgent/common";
import Footer from "../components/landing/Footer";
import Header from "../components/landing/Header";
import Section from "../components/landing/Section";
import { getReferralCode } from "../lib/api";
import Button from "../components/core/Button";

interface Props { }

const UrlField: React.FC<{ url: string }> = ({ url }) => {
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    }
  }, [copied]);
  const onClick = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };
  return (
    <input
      type="text"
      ref={inputRef}
      className="h-12 focus:ring-darkGray focus:border-darkGray focus:ring-0 block w-full pl-4 sm:text-sm border-darkGray-300 rounded-lg"
      value={copied ? "Copied!" : url}
      onClick={onClick}
    />
  );
};

const CopyButton: React.FC<{ url: string }> = ({ url }) => {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    }
  }, [copied]);
  const onClick = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
  };
  return (
    <Button className="mt-2 w-full" onClick={onClick}>
      {copied ? "Copied!" : "Copy"}
    </Button>
  );
};

const ReferFriendPage: NextPage<Props> = () => {
  const [code, setCode] = useState("");
  const onSubmit = (name: string, email: string) => {
    getReferralCode(name, email).then(setCode);
  };
  const referralUrl = `https://hellolina.com?ref=${code}`;
  return (
    <div>
      <Header title="Refer a Friend" />
      <Section className="bg-seashell flex justify-center">
        <div className="max-w-xl text-center">
          <h1 className="text-3xl md:text-4xl">Refer a friend</h1>
          <div className="mt-4">
            Your friends can get their first month of treatment for just $25.
            We&apos;ll credit your account $25 for every referral.
          </div>
          {!code ? (
            <div>
              <div className="text-sm mt-8 mb-4">
                Enter your info to get started:
              </div>
              <Formik
                initialValues={{ email: "", name: "" }}
                validationSchema={Yup.object().shape({
                  name: Yup.string().required("Required"),
                  email: Yup.string().email().required("Required"),
                })}
                onSubmit={(values) => onSubmit(values.name, values.email)}
              >
                {({ errors, touched }) => (
                  <Form className="text-left flex flex-col space-y-2">
                    <TextInput
                      type="text"
                      name="name"
                      label=""
                      hideError
                      placeholder="What's your name?"
                    />
                    <TextInput
                      type="email"
                      name="email"
                      hideError
                      label=""
                      placeholder="What's your email?"
                    />
                    <Button type="submit">Start Sharing</Button>
                  </Form>
                )}
              </Formik>
            </div>
          ) : (
            <div>
              <div className="text-sm mt-8 mb-4">
                Share your referral link with anyone:
              </div>
              <div className="flex flex-col">
                <UrlField url={referralUrl} />
                <CopyButton url={referralUrl} />
              </div>
            </div>
          )}
        </div>
      </Section>
      <Footer />
    </div>
  );
};

export default ReferFriendPage;
