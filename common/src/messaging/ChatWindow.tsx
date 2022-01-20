/**
 * Used to display an entire chat window, which includes
 * the message thread, the text entry box, send button, and context
 * such as the name of the thread.
 */
import React, { useEffect, useState } from "react";
import { Thread } from "@healthgent/server/src/lib/api_types";
// import ChevronRight from "../../../frontend/components/svg/ChevronRight";
import MessageThread from "./MessageThread";
import { useKeyPress } from "../hooks/key";
interface Props {
  thread: Thread;
  sendMessage: (content: string) => any;
  onBack?: () => any;
}

const ChatWindow: React.FC<Props> = ({ thread, sendMessage, onBack }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [sending, setSending] = useState(false);
  const enterPressed = useKeyPress("Enter");

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentMessage(e.target.value);
  };

  const addMessage = () => {
    const msg = currentMessage.trim();
    if (sending || !msg) {
      return;
    }
    setSending(true);
    sendMessage(msg)
      .then(() => setCurrentMessage(""))
      .finally(() => setSending(false));
  };

  if (enterPressed) {
    addMessage();
  }

  return (
    <div
      className="p-4 pb-2 flex-col"
      style={{ height: "80vh", maxHeight: "500px" }}
    >
      <div className="flex border-gray-200 border-b-2 py-2">
        <button onClick={onBack}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <span className="ml-2">{thread.subject}</span>
      </div>
      <div className="w-full overflow-auto h-96 flex flex-col-reverse">
        {thread ? <MessageThread thread={thread} /> : null}
      </div>
      <div className="w-full flex justify-between relative bottom-0">
        <textarea
          className="w-full h-10 outline-none flex-grow m-2 py-2 px-4 mr-1 rounded-full border border-gray-300 bg-gray-200 resize-none"
          placeholder="Message..."
          value={currentMessage}
          onChange={onChange}
        ></textarea>
        <button
          className="m-2 text-blue-400 outline-none focus:outline-none"
          onClick={addMessage}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
