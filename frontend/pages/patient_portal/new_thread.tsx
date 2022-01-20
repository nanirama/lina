/**
 * Page where the patients initiate threads with the providers/care team
 */
import { NewThreadForm } from "@healthgent/common";
import { CreateThreadParams } from "@healthgent/server/src/lib/api_types";
import { useRouter } from "next/router";
import React from "react";
import Button from "../../components/core/Button";
import BasePatientPortalView from "../../components/patient_portal/BasePatientPortalView";
import { createNewThread } from "../../lib/api";

interface Props { }

const NewThread: React.FC<Props> = () => {
  const router = useRouter();
  const handleSubmit = (params: CreateThreadParams) => {
    return createNewThread(params).then(() =>
      router.push("/patient_portal/messages")
    );
  };
  return (
    <BasePatientPortalView>
      {/* TODO(sbb): This is retarded */}
      <div className="text-center text-2xl font-semibold">
        Start a new thread
      </div>
      <div className="text-center text-sm text-blueGray-500 mt-2">
        Any care related questions will go directly to your provider. Any other
        questions will go to our customer support team, who will assist you as
        soon as possible.
      </div>
      <NewThreadForm handleSubmit={handleSubmit}>
        <Button type="submit">Send</Button>
      </NewThreadForm>
    </BasePatientPortalView>
  );
};

export default NewThread;
