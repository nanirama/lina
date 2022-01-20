/**
 * Component wrapping patient onboarding. Handles redirecting
 * if the user has skipped an onboarding step. Will likely be deprecated
 * if the onboarding flow is switched to Savvy.
 */
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect } from "react";
import ProgressBar from "@healthgent/common/src/components/ProgressBar";
import Logo from "../landing/Logo";
import { getOnboardingStatus } from "../../lib/api";
import { useAuth } from "@healthgent/common";
import { useRouter } from "next/router";
import {
  OnboardingStage,
  getNextOnboardingState,
  getRedirectUrl,
} from "../../context/onboarding";
import BackButton from "./BackButton";
import { useAppContext } from "../../context/AppContext";
import Notification from "../core/Notification";

interface Props {
  percent: number;
  title: string;
  stage: OnboardingStage;
  showBack?: boolean;
}

const promise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string);

const OnboardingContainer: React.FC<Props> = ({
  children,
  percent,
  title,
  stage,
  showBack = true,
}) => {
  const router = useRouter();
  const { isLoading, isAuthenticated } = useAuth();
  const { onboarding } = useAppContext();
  useEffect(() => {
    if (isLoading) {
      return;
    }

    getOnboardingStatus().then((onboardingStatus) => {
      const nextStage = getNextOnboardingState(onboardingStatus);
      console.log(onboardingStatus);
      console.log(`currentstage: ${stage} nextStage: ${nextStage}`);
      if (
        stage === "pre-screen" ||
        stage === "questionnaire" ||
        stage === "registration" ||
        stage === "scheduling" ||
        stage === "payment-success"
      ) {
        return;
      }
      if (stage !== nextStage) {
        console.log(
          `stage: ${stage} next stage: ${nextStage} redir url: ${getRedirectUrl(
            nextStage
          )}`
        );
        router.push(getRedirectUrl(nextStage));
      }
    });
  }, [isLoading, stage, router]);

  useEffect(() => {
    if (onboarding.notification) {
      setTimeout(() => {
        onboarding.setNotification("");
      }, 1500);
    }
  }, [onboarding.notification]);
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="bg-white h-screen text-blueGray-800">
        <nav className="w-full bg-white px-2 py-3 flex items-center justify-center">
          {showBack ? (
            <BackButton
              className="justify-self-start ml-2 text-coral"
              onClick={() => router.back()}
            />
          ) : null}
          <Link href="/">
            <a href="#" className="flex items-center mx-auto">
              <Logo />
            </a>
          </Link>
          <div className="ml-8"></div>
        </nav>
        <Elements stripe={promise}>
          <div className="min-h-screen">
            <div className="flex flex-col justify-center items-center mx-auto">
              <ProgressBar percent={percent} />
              <div className="mt-4 w-full max-w-3xl flex flex-col flex-wrap items-center px-4">
                <Notification
                  title={onboarding.notification}
                  show={!!onboarding.notification}
                  showClose={false}
                  onClose={() => null}
                />
                {children}
              </div>
            </div>
          </div>
        </Elements>
      </div>
    </>
  );
};

export default OnboardingContainer;
