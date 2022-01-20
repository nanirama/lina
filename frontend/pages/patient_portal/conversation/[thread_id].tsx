/**
 * Used to display an individual conversation thread within the patient portal
 */
import { NextPage } from "next";
import React from "react";
import BasePatientPortalView from "../../../components/patient_portal/BasePatientPortalView";
import useSWR from "swr";
import { getThread, postMessage } from "../../../lib/api";
import { ChatWindow } from "@healthgent/common";
import { useRouter } from "next/router";

interface Props {
  threadId: string;
}

const ConversationView: NextPage<Props> = ({ threadId }) => {
  const router = useRouter();
  const { data: thread, mutate } = useSWR(threadId, getThread);
  const sendMessage = (content: string) => {
    return postMessage(threadId, content).then(() => mutate());
  };

  if (!thread) {
    return <BasePatientPortalView>Loading thread...</BasePatientPortalView>;
  }
  return (
    <BasePatientPortalView>
      <div className="px-4 md:px-12 py-4">
        <div className="bg-gray-50 rounded-xl ml-2 border">
          <ChatWindow
            thread={thread}
            sendMessage={sendMessage}
            onBack={() => router.back()}
          />
        </div>
      </div>
    </BasePatientPortalView>
  );
};

ConversationView.getInitialProps = ({ query }) => {
  const threadId = query.thread_id as string;
  return { threadId };
};

export default ConversationView;
