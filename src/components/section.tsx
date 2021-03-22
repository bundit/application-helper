import React, { useEffect, useState } from "react";

import { UserContentItem } from "../@types";
import { loadItems, saveItems } from "../utils/helpers";
import ContentItem from "./content-item";
import NewItemButton from "./new-item-button";
import NewItemModal from "./item-modal";
import EditItemModal from "./item-modal";
import styles from "../styles/section.module.scss";

type SectionProps = {
  title: string;
};

function Section({ title }: SectionProps) {
  const [items, setItems] = useState<UserContentItem[]>(loadItems(title));
  const [isNewItemModalOpen, setIsNewItemModalOpen] = useState(false);
  const [isEditItemModalOpen, setIsEditItemModalOpen] = useState(false);
  const [currentEdittingItem, setCurrentEdittingItem] = useState<
    UserContentItem
  >();

  useSyncItemsToLocalStorage(title, items);

  function toggleNewItemModal() {
    setIsNewItemModalOpen(!isNewItemModalOpen);
  }

  function handleSubmitNewItem(newItem: UserContentItem) {
    setItems([...items, newItem]);
  }

  function toggleEditItemModal(selectedItem?: UserContentItem) {
    if (selectedItem) {
      setCurrentEdittingItem(selectedItem);
    }

    setIsEditItemModalOpen(!isEditItemModalOpen);
  }

  function handleSubmitEditItem(editedItem: UserContentItem) {
    setItems(
      items.map((item) => {
        if (item === currentEdittingItem) {
          return editedItem;
        }
        return item;
      })
    );
  }

  function handleDeleteItem(itemToDelete: UserContentItem) {
    setItems(items.filter((item) => item !== itemToDelete));
  }

  return (
    <section className={styles.section}>
      <span className={styles.sectionTitle}>
        <h2>{title}</h2>
      </span>
      <div className={styles.sectionContentWrapper}>
        {items.map((item, i) => (
          <ContentItem
            key={`${item.title}:${i}`}
            contentItem={item}
            openEditor={toggleEditItemModal}
            deleteItem={handleDeleteItem}
          />
        ))}
        <NewItemButton onClick={toggleNewItemModal} />
      </div>

      <NewItemModal
        type={title}
        isOpen={isNewItemModalOpen}
        closeModal={toggleNewItemModal}
        onSubmit={handleSubmitNewItem}
      />

      <EditItemModal
        type={title}
        isOpen={isEditItemModalOpen}
        closeModal={toggleEditItemModal}
        onSubmit={handleSubmitEditItem}
        userItem={currentEdittingItem}
      />
    </section>
  );
}

function useSyncItemsToLocalStorage(title: string, items: UserContentItem[]) {
  useEffect(() => {
    saveItems(title, items);
  }, [title, items]);
}

export default Section;
