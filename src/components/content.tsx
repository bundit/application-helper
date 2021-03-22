import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";

import { loadItems, saveItems } from "../utils/helpers";
import Section from "./section";
import SectionModal from "./section-modal";
import sectionStyles from "../styles/section.module.scss";
import styles from "../styles/content.module.scss";

const serializedList = loadItems("sections");

const sectionList: string[] = serializedList.length
  ? serializedList
  : ["Links", "Cover Letters", "Files"];

function Content() {
  const [sections, setSections] = useState(sectionList);
  const [isNewSectionModalOpen, setIsNewSectionModalOpen] = useState(false);

  useEffect(() => {
    saveItems("sections", sections);
  }, [sections]);

  function toggleNewSectionModal() {
    setIsNewSectionModalOpen(!isNewSectionModalOpen);
  }

  function addNewSection(newTitle: string) {
    setSections([...sections, newTitle]);
  }

  function deleteSection(title: string, index: number) {
    setSections(
      sections.filter((section, i) => section !== title && index !== i)
    );
  }

  return (
    <div className={styles.contentWrapper}>
      {sections.map((section, i) => (
        <Section
          key={`${section}:${i}`}
          title={section}
          deleteSection={deleteSection}
          index={i}
        />
      ))}
      <NewSectionButton onClick={toggleNewSectionModal} />

      <SectionModal
        isOpen={isNewSectionModalOpen}
        closeModal={toggleNewSectionModal}
        onSubmit={addNewSection}
      />
    </div>
  );
}

function NewSectionButton({ onClick }: { onClick: () => void }) {
  return (
    <section className={sectionStyles.section}>
      <span className={sectionStyles.newSectionTitle}>
        <button
          type="button"
          className={sectionStyles.newSectionButton}
          onClick={onClick}
        >
          <h2>
            <FontAwesomeIcon icon={faPlus} size="2x" />
          </h2>
        </button>
      </span>
    </section>
  );
}

export default Content;
