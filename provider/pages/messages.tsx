/**
 * Show a list of conversation threads with patients.
 */
import React from "react";
import { ThreadList } from "@healthgent/common";
import useSWR from "swr";
import BaseProviderView from "../components/core/BaseView";
import { getInbox } from "../lib/api";
import Card from "../components/Card";

interface Props { }

const Messages: React.FC<Props> = () => {
  const { data: inbox } = useSWR("provider_inbox", getInbox);
  if (!inbox) {
    return <BaseProviderView>Loading...</BaseProviderView>;
  }
  return (
    <BaseProviderView>
      <div className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Messages
      </div>
      <Card>
        <ThreadList
          threads={inbox.threads}
          threadToUrl={(tid: string) => `/conversation/${tid}`}
        />
      </Card>
    </BaseProviderView>
  );
};

export default Messages;
