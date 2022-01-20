/**
 * Shows a conversation thread in the messaging system.
 * Shows a bit of patient info at the top to provide
 * context for the clinician.
 */

import { useRouter } from "next/router";
import React from "react";
import { ChatWindow } from "@healthgent/common";
import { NextPage } from "next";
import useSWR from "swr";
import BaseProviderView from "../../components/core/BaseView";
import {
  getPatientChart,
  getThread,
  getTreatToken,
  postMessage,
} from "../../lib/api";
import PatientInfo from "../../components/chart/PatientInfo";
import Button from "../../components/core/Button";
import MedicationList from "../../components/chart/MedicationList";
import { getPrescribeUrl } from "../../lib/util";

interface Props {
  threadId: string;
}

const Conversation: NextPage<Props> = ({ threadId }) => {
  const router = useRouter();
  const { data: thread, mutate } = useSWR(threadId, getThread);
  const { data: patient } = useSWR(thread?.patientId ?? null, getPatientChart);
  const { data: treatJwt } = useSWR("treat_token", getTreatToken);

  const patientId = thread?.patientId;

  if (!patient) {
    return <BaseProviderView>Loading patient...</BaseProviderView>;
  }
  const sendMessage = (content: string) => {
    return postMessage(threadId, content).then(() => mutate());
  };
  if (!thread) {
    return <BaseProviderView>Loading...</BaseProviderView>;
  }

  const eprescribeUrl = getPrescribeUrl(treatJwt || "");
  return (
    <BaseProviderView>
      <div className="px-4 md:px-12 py-4">
        <div className="flex mb-4">
          <PatientInfo clientId={patientId as string} {...patient}>
            <a target="_blank" rel="noreferrer" href={eprescribeUrl}>
              <Button>E-prescribe</Button>
            </a>
          </PatientInfo>
          <div className="ml-4 w-1/3">
            <MedicationList
              medications={patient.medications}
              addMedication={() => Promise.resolve(null)}
              updateMedication={() => Promise.resolve(null)}
              showAdd={false}
            />
          </div>
        </div>
        <div className="bg-gray-50 rounded-xl border">
          <ChatWindow
            thread={thread}
            sendMessage={sendMessage}
            onBack={() => router.back()}
          />
        </div>

        <div className="w-1/3"></div>
      </div>
    </BaseProviderView>
  );
};

Conversation.getInitialProps = ({ query }) => {
  const threadId = query.tid as string;
  return { threadId };
};

export default Conversation;
