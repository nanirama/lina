// @ts-nocheck
/**
 * File upload form
 * Don't think this is actively used at the moment
 */
import React, { useState, useRef } from "react";

interface Props {
  label: string;
  subtext?: string;
  onChange: (file: File) => void;
  currentFile?: File;
}

const FileUpload: React.FC<Props> = ({
  label,
  subtext,
  onChange,
  currentFile,
}) => {
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files.length > 0) {
      onChange(e.target?.files[0]);
    }
  };
  const inputRef = useRef<HTMLInputElement>();
  const openFileDialog = (): void => {
    inputRef?.current.click();
  };
  return (
    <div className="flex flex-col max-w-xl max-h-xl mb-4">
      <div className="w-full text-sm flex">
        <div className="flex-1">{label}</div>
        {currentFile && <button onClick={openFileDialog}>Edit</button>}
      </div>
      <input hidden type="file" ref={inputRef} onChange={handleUpload} />
      <div
        onClick={openFileDialog}
        className="w-full h-full flex flex-col justify-center flex-grow-0 border border-gray-200"
      >
        {!currentFile && (
          <div className="flex text-center items-center justify-center  text-gray-400 px-4">
            Click to upload or take a picture
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-16 h-16"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
        )}
        {currentFile && (
          <img
            className="w-full h-full"
            src={URL.createObjectURL(currentFile)}
          />
        )}
      </div>
    </div>
  );
};

export default FileUpload;
