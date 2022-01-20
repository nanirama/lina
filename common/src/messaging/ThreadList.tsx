/**
 * Shows a list of message threads for a user, ordered chronologically
 */
import cx from "classnames";
import Link from "next/link";
import React, { useState } from "react";
import { Inbox, Thread } from "@healthgent/server/src/lib/api_types";

const Preview: React.FC<{
  thread: Thread;
  url: string;
}> = ({ thread, url }) => {
  const containerClass = cx(
    "flex flex-col justify-between h-16 border-b p-2 hover:bg-blueGray-50"
  );
  const lastMessageTime = new Date(thread.lastMessageTime);
  return (
    <Link href={url}>
      <div className={containerClass}>
        <div className="flex items-center justify-center justify-between">
          <span className="font-semibold flex items-center">
            {thread.unreadMessages > 0 ? (
              <div className="rounded-full bg-blue-500 w-2 h-2 -ml-4 mr-2"></div>
            ) : null}
            {thread.title}
          </span>
          <span className="self-end text-sm text-gray-400">
            {lastMessageTime.toLocaleDateString()}
          </span>
        </div>
        <span className="text-gray-400 overflow-hidden mr-2 md:mr-8">
          {thread.messagePreview}
        </span>
      </div>
    </Link>
  );
};

interface Props {
  threads: Array<Thread>;
  threadToUrl: (t: string) => string;
}

const ThreadList: React.FC<Props> = ({ threads, threadToUrl }) => {
  return (
    <div className="w-full flex flex-col">
      {threads
        .sort((a, b) => b.lastMessageTime - a.lastMessageTime)
        .map((t) => (
          <Preview thread={t} key={t.id} url={threadToUrl(t.id)} />
        ))}
    </div>
  );
};

export default ThreadList;
