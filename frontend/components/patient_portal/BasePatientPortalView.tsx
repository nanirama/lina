/**
 * Styled base component for patient portal that also ensures it is
 * only rendered when the patient is logged in
 */
import cx from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect } from "react";
import AppHeader from "../core/AppHeader";
import Dashboard from "../svg/Dashboard";
import Message from "../svg/Message";
import Person from "../svg/Person";
import Question from "../svg/Question";
import { ProtectedView, useAuth } from "@healthgent/common";
import Clipboard from "../svg/Clipboard";
import Head from "next/head";
import { getOnboardingStatus, getUnreadMessageCount } from "../../lib/api";
import {
  getNextOnboardingState,
  getRedirectUrl,
} from "../../context/onboarding";
import useSWR from "swr";

interface Props {}

const SideBarItem: React.FC<{
  title: ReactNode;
  link: string;
  icon: any;
  selected: boolean;
}> = ({ title, icon, link, selected }) => {
  const style = cx(
    "group mx-auto md:mx-0 relative sidebar-item with-children hover:bg-gray-100 w-1/4 md:w-auto",
    "md:border-r-4",
    "border-b-4",
    "md:border-b-0",
    {
      "border-transparent": !selected,
      "border-gray-400": selected,
    }
  );
  return (
    <div className={style}>
      <Link href={link}>
        <a className="flex flex-col md:flex-row items-center text-center xl:text-left shadow-light xl:shadow-none py-3 xl:py-2 xl:px-4 border-l-4 border-transparent">
          <span className="text-coral">{icon}</span>
          <div className="text-xs">{title}</div>
        </a>
      </Link>
    </div>
  );
};

const UnreadMessageIcon = () => {
  return (
    <div className="relative">
      <div className="w-2 h-2 rounded-full absolute t-0 bg-red-500" />
      <Message />
    </div>
  );
};

const BasePatientPortalView: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const { isLoggedInAs } = useAuth();

  const { data: onboardingStatus, error } = useSWR(
    "portal_status",
    getOnboardingStatus
  );
  const { data: numUnreadMessages } = useSWR(
    "unread_messages",
    getUnreadMessageCount
  );
  useEffect(() => {
    if (!onboardingStatus) {
      return;
    }
    const nextStage = getNextOnboardingState(onboardingStatus);
    if (nextStage !== "complete") {
      router.push(getRedirectUrl(nextStage));
    }
  }, [onboardingStatus]);

  return (
    <ProtectedView>
      <Head>
        <title>Lina Patient Portal</title>
      </Head>
      <AppHeader isLoggedInAs={isLoggedInAs} />
      <div className="flex flex-row">
        <div
          className={cx(
            "w-full flex md:flex-col md:w-min fixed bottom-0 pin-b md:relative md:h-full md:min-h-screen",
            isLoggedInAs ? "bg-coral-100" : "bg-white"
          )}
        >
          <div className="hidden xl:block uppercase font-bold text-xs px-4 py-2">
            Main
          </div>
          <SideBarItem
            title="Overview"
            link={"/patient_portal/home"}
            selected={router.pathname === "/patient_portal/home"}
            icon={<Dashboard />}
          />
          <SideBarItem
            title="Messages"
            link={"/patient_portal/messages"}
            selected={router.pathname === "/patient_portal/messages"}
            icon={
              (numUnreadMessages || 0) > 0 ? <UnreadMessageIcon /> : <Message />
            }
          />
          <SideBarItem
            title="Prescriptions"
            link={"/patient_portal/prescriptions"}
            selected={router.pathname === "/patient_portal/prescriptions"}
            icon={<Clipboard />}
          />
          <div className="hidden xl:block uppercase font-bold  text-xs px-4 py-2">
            Settings
          </div>
          <SideBarItem
            title="Profile"
            link={"/patient_portal/profile"}
            selected={router.pathname === "/patient_portal/profile"}
            icon={<Person />}
          />
          <SideBarItem
            title="FAQ"
            link={"/patient_portal/faq"}
            selected={router.pathname === "/patient_portal/faq"}
            icon={<Question />}
          />
          {isLoggedInAs && (
            <SideBarItem
              title={<strong>Back to superuser</strong>}
              link={"/superuser"}
              selected={false}
              icon={null}
            />
          )}
          <div className="py-4 hidden">
            <div className="hidden xl:block uppercase font-bold  text-xs px-4 py-2">
              Action
            </div>
            <div className="px-2">
              <a
                href="#"
                className="flex items-center justify-center py-2 w-full text-xs text-center text-white bg-blue hover:bg-blue-dark rounded shadow-light font-bold"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="h-4 w-4 mr-1 fill-current"
                >
                  <path
                    d="M17 11a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4z"
                    className="heroicon-ui"
                  ></path>
                </svg>
                Button
              </a>
            </div>
          </div>
        </div>
        <div
          className={cx(
            "px-4 md:px-12 py-4 w-full h-screen overflow-y-auto",
            isLoggedInAs ? "bg-coral-200" : "bg-blueGray-50"
          )}
        >
          {children}
          <div className="h-24"></div>
        </div>
      </div>
    </ProtectedView>
  );
};

export default BasePatientPortalView;
