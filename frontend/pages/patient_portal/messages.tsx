/**
 * Messages tab on the patient portal
 */
import React from "react";
import BasePatientPortalView from "../../components/patient_portal/BasePatientPortalView";
import useSWR from "swr";
import { getInbox, getProfile } from "../../lib/api";
import { ThreadList } from "@healthgent/common";
import Card from "../../components/core/Card";
import Link from "next/link";

interface Props { }

const Messages: React.FC<Props> = () => {
  const { data: inbox } = useSWR("patient_inbox", getInbox);
  const { data: patient } = useSWR("patient_message_info", getProfile);

  if (!inbox) {
    return <BasePatientPortalView>Loading inbox...</BasePatientPortalView>;
  }

  const hasMessages = inbox.threads.length > 0;

  if (patient?.hasCompletedFirstAppointment) {
    return (
      <BasePatientPortalView>
        <Card className="justify-center text-center my-4 text-sm">
          If you need immediate help for emotional distress, please do not wait.
          If you&apos;re having a medical or mental health emergency, call 911.
          <br />
          If you&apos;re in serious emotional distress, text HOME to 741-741 to
          talk to a counselor immediately.
          <br />
        </Card>
        <Card className="justify-center text-center my-4 px-8 text-sm">
          This secure portal is for discussing treatment matters with your
          provider. For any customer support questions, please email us at{" "}
          support@hellolina.com or text our support line directly at (201)
          817-4909.
        </Card>
        <Card className="flex-col">
          <div className="flex text-2xl font-bold items-center">
            <span>Message your provider</span>
            <Link href="/patient_portal/new_thread">
              <a href="#" className="ml-auto">
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
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </a>
            </Link>
          </div>
          {hasMessages ? (
            <ThreadList
              threads={inbox.threads}
              threadToUrl={(tid: string) =>
                `/patient_portal/conversation/${tid}`
              }
            />
          ) : (
            <div className="text-sm text-blueGray-500 mt-4">
              You have no messages. You can start a thread with your
              providerabove. Please note that your provider may take up to 24
              hours to respond to medical inquiries.
            </div>
          )}
        </Card>
      </BasePatientPortalView>
    );
  }
  return (
    <BasePatientPortalView>
      <Card className="flex-col">
        <div className="text-center text-2xl font-bold">
          Get in touch with your provider
        </div>
        <div className="mt-4 text-center">
          After your first appointment, you will be able to ask your provider
          questions here. Have questions for our support team? <br />
          Text us at{" "}
          <a className="underline" href="tel:(201) 817-4909">
            (201) 817-4909
          </a>
          {". "}
        </div>
        <div className="text-center mt-2 text-sm text-gray-400">
          If you need immediate help for emotional distress, please do not wait.
          If you&apos;re having a medical or mental health emergency, call 911.
          If you&apos;re in serious emotional distress, text HOME to{" "}
          <a href="tel: 741-741" className="underline">
            741-741
          </a>{" "}
          to talk to a counselor immediately.
        </div>
      </Card>
    </BasePatientPortalView>
  );
};

export default Messages;
