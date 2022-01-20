// @ts-nocheck
/**
 * Prototype of using the Chrome browser speech recognition API.
 * We had this as a feature in the EMR briefly but it was not
 * polished enough for production use. Useful as a reference
 * if this is ever implemented properly.
 */
import React, { useState, useEffect } from "react";

interface Options {
  continuous?: boolean;
}

export const useSpeechRecognition = () => {
  const [results, setResults] = useState<Array<string>>([]);
  const [interim, setInterim] = useState<Array<string>>([]);
  const [recognition, setRecognition] = useState();

  useEffect(() => {
    const rec = new window.webkitSpeechRecognition();
    rec.continuous = true;
    rec.interimResults = true;
    rec.onresult = (event) => {
      const current: Array<string> = [];
      const processing: Array<string> = [];
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          current.push(event.results[i][0].transcript);
        } else {
          processing.push(event.results[i][0].transcript);
        }
      }
      setResults((prevResults) => [...prevResults, ...current]);
      setInterim(processing);
    };
    setRecognition(rec);
  }, []);

  const startRecognition =
    recognition !== undefined ? () => recognition.start() : undefined;
  const stopRecognition =
    recognition !== undefined ? () => recognition.stop() : undefined;

  return { results, interim, startRecognition, stopRecognition };
};
