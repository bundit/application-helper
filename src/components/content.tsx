import React, { useEffect, useState } from "react";

import { loadItems, saveItems } from "../utils/helpers";
import Section from "./section";
import styles from "../styles/content.module.scss";

const serializedList = loadItems("sections");

const sectionList: string[] = serializedList.length
  ? serializedList
  : ["Links", "Cover Letters", "Files"];

function Content() {
  const [sections, setSections] = useState(sectionList);

  useEffect(() => {
    saveItems("sections", sections);
  }, [sections]);

  return (
    <div className={styles.contentWrapper}>
      {sections.map((section, i) => (
        <Section key={`${section}:${i}`} title={section} />
      ))}
    </div>
  );
}

export default Content;
