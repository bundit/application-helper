import Modal from "react-modal";
import React, { useState } from "react";

import styles from "../styles/modal.module.scss";

interface SectionModalProps {
  isOpen: boolean;
  closeModal: () => void;
  onSubmit: (newSectionTitle: string) => void;
}

function SectionModal({ isOpen, closeModal, onSubmit }: SectionModalProps) {
  const [newSectionTitle, setNewSectionTitle] = useState("");

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    onSubmit(newSectionTitle);
    closeModal();
    setNewSectionTitle("");
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewSectionTitle(e.target.value);
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="New Section"
      className={styles.sectionModal}
      overlayClassName={styles.modalOverlay}
    >
      <div className={styles.modalContentWrapper} style={{ height: "300px" }}>
        <header className={styles.modalHeader}>
          <h2>New Section</h2>
        </header>

        <form className={styles.modalForm} onSubmit={handleSubmit}>
          <label className={styles.formLabel} htmlFor="sectionTitle">
            <span>Section Title</span>
            <input
              id="itemTitle"
              type="text"
              value={newSectionTitle}
              name="title"
              onChange={handleChange}
            />
          </label>

          <div className={styles.submitWrapper}>
            <button type="button" onClick={closeModal}>
              Cancel
            </button>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default SectionModal;
