/**
 * Single chat bubble in a message thread
 */
import cx from "classnames";
import React from "react";
import { Message } from "@healthgent/server/src/lib/api_types";

interface Props {
  message: Message;
}

const MessageComponent: React.FC<Props> = ({ message }) => {
  const { content, sender } = message;
  return (
    <div className={cx("flex mx-2", { "flex-row-reverse": !message.inbound })}>
      {/* <div className="my-auto mx-2">{profilePicture}</div> */}
      <div className="my-2">
        <div className="text-xs text-gray-500">{sender.displayName}</div>
        <div className="self-start max-w-sm inline-block bg-gray-300 w-min sm:w-auto p-2 rounded-lg">
          {content}
        </div>
      </div>
    </div>
  );
};

export default MessageComponent;
