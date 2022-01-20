/**
 * Rich text editor used to edit a note
 */

import React, { useState } from "react";
import { NoteData, Note } from "@healthgent/server/src/lib/api_types";
import cx from "classnames";
import ChangeNoteModal from "./ChangeNoteModal";
import Editor from "../chart/Editor";
import PatientNote from "../chart/PatientNote";
import useSWR from "swr";
import { getTemplates } from "../../lib/api";

interface Props {
  updateNote: (ns: NoteData, locked?: boolean) => any;
  note?: Note;
  initialState?: NoteData;
  updatedAt?: Date;
}

const NoteEditor: React.FC<Props> = ({
  initialState,
  updateNote,
  updatedAt,
  note,
}) => {
  const { data } = useSWR("template_list", getTemplates, {});
  const [modal, setModal] = useState<React.ReactElement>();
  // @ts-ignore
  const [noteState, setNoteState] = useState<NoteData>(initialState);
  const [content, setContent] = useState(noteState?.content || "");
  const [editable, setEditable] = useState(!note || (note && !note.locked));

  const templates = data ?? [];

  const saveNote = () => {
    updateNote({ ...noteState, content }).then(() => setEditable(false));
  };

  const lockAndSign = () => {
    updateNote({ ...noteState, content }, true);
  };

  const changeNoteTemplate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const templateId = e.target.value;
    const template = templates.find((t) => t.id === templateId);
    setModal(
      <ChangeNoteModal
        closeModal={() => setModal(undefined)}
        onClick={() => {
          setNoteState({
            ...noteState,
            content: template?.value as string,
            templateId,
          });
          setModal(undefined);
        }}
      />
    );
  };

  const templateId = noteState?.templateId || "none";
  const selectedTemplate = templates.find((t) => `${t.id}` === `${templateId}`);
  const editorInitialValue =
    noteState?.content || selectedTemplate?.value || "";

  return (
    <div className="bg-white rounded shadow p-4 mb-4">
      {modal ?? ""}
      <div className="flex-col mb-2">
        <div className="flex mb-4">
          <div className="">
            <h1 className="text-lg">Chart Note</h1>
            <h4 className="text-xs text-gray-400">
              (Part of the patient record)
            </h4>
          </div>

          {editable ? (
            <div className="ml-auto items-center w-64">
              <div className="text-sm font-semibold">Template</div>
              <select
                className="rounded w-full text-sm shadow mb-2 p-2"
                value={templateId}
                onChange={changeNoteTemplate}
              >
                <option value="none">No Template</option>
                {templates.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div
              className={cx(
                "w-full justify-items-end items-center",
                note?.locked ? "hidden" : "flex"
              )}
            >
              <a
                href="#"
                className="ml-auto mr-2 secondary-button-blue"
                onClick={() => setEditable(true)}
              >
                Edit
              </a>
              <a href="#" onClick={lockAndSign} className="primary-button-blue">
                Lock and Sign
              </a>
            </div>
          )}
        </div>

        {!editable && note ? (
          <PatientNote
            note={
              note.locked ? note : { ...note, data: { ...noteState, content } }
            }
          />
        ) : null}

        {editable && (
          <>
            <div className="">
              <Editor
                onUpdate={(content) => setContent(content)}
                initialValue={editorInitialValue}
                placeholder="Add chart note: include notes from call with client."
                showSpeechToText={false}
              />
            </div>
            <button
              className="w-24 mt-2 primary-button-blue"
              onClick={saveNote}
            >
              Save
            </button>
          </>
        )}
      </div>
      {updatedAt && (
        <div className="text-gray-600 mt-2 font-semibold">
          Note last updated on{" "}
          {`${new Date(updatedAt).toLocaleDateString()} at ${new Date(
            updatedAt
          ).toLocaleTimeString()}.`}
        </div>
      )}
    </div>
  );
};

export default NoteEditor;
