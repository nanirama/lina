/**
 * This modal is shown when the clinician wants to change the note
 * template being used. It's a warning since changing the template
 * will clear out the previous note.
 */
import React from "react";
import Modal from "../Modal";

interface Props {
  onClick: () => any;
  closeModal: () => any;
}
const ChangeNoteModal: React.FC<Props> = ({ onClick, closeModal }) => (
  <Modal onClose={closeModal}>
    <div className="flex flex-col">
      <div>
        <div>
          Are you sure you want to change the note type? It will clear the note.
          <button
            className="secondary-button-red w-full h-12 mt-2"
            onClick={onClick}
          >
            Change type
          </button>
        </div>
      </div>
    </div>
  </Modal>
);

export default ChangeNoteModal;
