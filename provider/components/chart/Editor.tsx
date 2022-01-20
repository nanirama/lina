/**
 * This wraps the react-quilljs package, and provides a WYSIWYG editor for
 * providers to be able to write chart notes with rich formatting.
 *
 */
import React, { useState } from "react";
import { useQuill } from "react-quilljs";

import "quill/dist/quill.snow.css";
import { useSpeechRecognition } from "@healthgent/common";

interface Props {
  onUpdate?: (s: string) => void;
  initialValue?: string;
  placeholder: string;
  // NOTE: Speech recognition is unused.
  // Feel free to remove this along with all associated functionality
  showSpeechToText?: boolean;
}

// docs: https://www.npmjs.com/package/react-quilljs
const Editor: React.FC<Props> = ({
  onUpdate,
  initialValue,
  placeholder,
  showSpeechToText,
}) => {
  const { results, interim, startRecognition, stopRecognition } =
    useSpeechRecognition();
  const [started, setStarted] = useState(false);

  const theme = "snow";
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
    ],
  };
  const formats = ["bold", "italic", "underline", "strike", "list", "indent"];

  const { quill, quillRef } = useQuill({
    theme,
    modules,
    placeholder,
    formats,
  });

  const insertText = (text: string) => {
    const range = quill?.getSelection();
    quill?.insertText(range?.index || 0, text);
  };

  const startStt = () => {
    if (startRecognition) {
      setStarted(true);
      startRecognition();
    }
  };
  const stopStt = () => {
    if (stopRecognition) {
      stopRecognition();
      setStarted(false);
      const text = [...results, ...interim].join(". ");
      insertText(text);
    }
  };

  const toggleStt = () => {
    if (started) {
      stopStt();
    } else {
      startStt();
    }
  };
  React.useEffect(() => {
    if (quill) {
      if (initialValue !== undefined) {
        quill.clipboard.dangerouslyPasteHTML(initialValue);
        // quill.setSelection(0, 0);
      }
      quill.on("text-change", (e) => {
        // console.log(quill.getContents());
        // console.log(quill.container.firstChild.innerHTML);
        if (onUpdate) {
          // @ts-ignore
          onUpdate(quill.container.firstChild.innerHTML);
        }
      });
    }
  }, [quill, initialValue]);
  return (
    <div className="flex flex-col flex-grow">
      <div ref={quillRef} />
      {showSpeechToText ? (
        <button
          className="secondary-button-blue flex items-center justify-center mt-2"
          onClick={toggleStt}
          disabled={!startRecognition}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4 mr-2"
          >
            <path
              fillRule="evenodd"
              d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
              clipRule="evenodd"
            />
          </svg>
          {!started ? "Start Recording" : "Stop Recording"}
        </button>
      ) : null}
    </div>
  );
};

export default Editor;
