import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCopy, faPen } from "@fortawesome/free-solid-svg-icons";
import React from "react";

import { UserContentItem } from "../@types";
import styles from "../styles/content-item.module.scss";

interface ContentItemProps {
  contentItem: UserContentItem;
  openEditor: (item: UserContentItem) => void;
  deleteItem: (item: UserContentItem) => void;
}

function ContentItem({
  contentItem,
  openEditor,
  deleteItem,
}: ContentItemProps) {
  const { title, content, notes } = contentItem;

  function handleCopy() {
    console.log(content);
  }

  function handleEdit() {
    openEditor(contentItem);
  }

  function handleDelete() {
    const confirmDeleteItem = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (confirmDeleteItem) {
      deleteItem(contentItem);
    }
  }

  return (
    <div className={styles.contentItemWrapper}>
      <header>
        <h3>{title}</h3>
      </header>
      <p>{notes}</p>
      <footer>
        <button onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
        <button onClick={handleEdit}>
          <FontAwesomeIcon icon={faPen} />
        </button>
        <button onClick={handleCopy}>
          <FontAwesomeIcon icon={faCopy} />
        </button>
      </footer>
    </div>
  );
}

export default ContentItem;
