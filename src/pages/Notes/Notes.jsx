import React, { useState } from "react";
import styles from "./Notes.module.css";
import SubjectContainer from "../../components/SubjectContainer/SubjectContainer.jsx";
const Notes = () => {
  return (
    <main className={styles.notesPage}>
      <header>
        <h1 className={styles.heading}>Notes</h1>
      </header>
      <SubjectContainer />
    </main>
  );
};

export default Notes;
