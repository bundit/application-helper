import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React from "react";

import styles from "../styles/content-item.module.scss";

interface NewItemButtonProps {
  onClick: () => void;
}

function NewItemButton({ onClick }: NewItemButtonProps) {
  return (
    <button className={styles.newContentButton} onClick={onClick}>
      <FontAwesomeIcon icon={faPlus} size="2x" />
    </button>
  );
}

export default NewItemButton;
