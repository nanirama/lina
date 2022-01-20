/**
 * Simple wrapper for the Editor component used to add a chart note to a patient page
 * outside of a visit.
 */
import React from "react";
import Card from "../Card";
import Editor from "./Editor";

interface Props {
  onUpdate: (content: string) => any;
  onSubmit: () => Promise<any>;
}

const BasicEditor: React.FC<Props> = ({ onUpdate, onSubmit }) => {
  return (
    <Card className="flex flex-col">
      <div className="font-bold text-lg">Create Chart Note</div>
      <Editor
        onUpdate={onUpdate}
        placeholder="Add chart note: include notes from call with client."
        showSpeechToText={false}
      />
      <div className="mt-2 flex space-x-1">
        <button
          type="button"
          className="primary-button-blue"
          onClick={onSubmit}
        >
          Add Note
        </button>
      </div>
    </Card>
  );
};

export default BasicEditor;
