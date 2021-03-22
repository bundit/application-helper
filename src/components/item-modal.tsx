import Modal from "react-modal";
import React, { useEffect, useState } from "react";

import { UserContentItem } from "../@types";
import { removeTrailingS } from "../utils/helpers";
import styles from "../styles/modal.module.scss";

interface ItemModalProps {
  type: string;
  isOpen: boolean;
  closeModal: () => void;
  onSubmit: (newItem: UserContentItem) => void;
  userItem?: UserContentItem;
}

// http://reactcommunity.org/react-modal/accessibility/
Modal.setAppElement("#root");

const emptyItem = {
  title: "",
  content: "",
  notes: "",
};

function ItemModal({
  type,
  isOpen,
  closeModal,
  onSubmit,
  userItem,
}: ItemModalProps) {
  const itemInitialState = userItem || emptyItem;
  const [item, setItem] = useState<UserContentItem>(itemInitialState);

  useEffect(() => {
    if (userItem) {
      setItem(userItem);
    }
  }, [userItem]);

  useEffect(() => {
    if (isOpen) {
    }
  }, [isOpen]);

  function handleInputChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    });
  }

  function clearInputs() {
    setItem(emptyItem);
  }

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    onSubmit(item);
    clearInputs();
    closeModal();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel={`New ${type}`}
      className={styles.modal}
      overlayClassName={styles.modalOverlay}
    >
      <div className={styles.modalContentWrapper}>
        <header className={styles.modalHeader}>
          <h2>{`${userItem ? "Edit" : "New"} ${removeTrailingS(type)}`}</h2>
        </header>

        <form className={styles.modalForm} onSubmit={handleSubmit}>
          <label className={styles.formLabel} htmlFor="itemTitle">
            <span>Title</span>
            <input
              id="itemTitle"
              type="text"
              value={item.title}
              name="title"
              onChange={handleInputChange}
            />
          </label>

          <label className={styles.formLabel} htmlFor="itemContent">
            <span>Content</span>
            <textarea
              id="itemContent"
              cols={30}
              rows={10}
              value={item.content}
              name="content"
              onChange={handleInputChange}
            />
          </label>
          <label className={styles.formLabel} htmlFor="itemNotes">
            <span>Notes</span>
            <textarea
              id="itemNotes"
              cols={30}
              rows={10}
              value={item.notes}
              name="notes"
              onChange={handleInputChange}
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

export default ItemModal;
