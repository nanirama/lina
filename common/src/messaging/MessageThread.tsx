/**
 * Shows a message thread as a list of messages in chronological order
 */
import React from "react";
import { Thread } from "@healthgent/server/src/lib/api_types";
import Message from "./Message";
import ProfilePicture from "./ProfilePicture";

interface Props {
  thread: Thread;
}

const MessageThread: React.FC<Props> = ({ thread }) => {
  return (
    <>
      {thread.messages
        ?.sort((a, b) => b.timestamp - a.timestamp)
        .map((m) => {
          return <Message key={m.id} message={m} />;
        })}
    </>
  );
};

export default MessageThread;
