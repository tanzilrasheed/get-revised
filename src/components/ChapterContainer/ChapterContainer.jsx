import { useState } from 'react';
import Chapter from '../Chapter/Chapter.jsx'
import styles from './ChapterContainer.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
const ChapterContainer = ({ chaptersArr, subjectsObj, seSubjectsObj }) => {
    const [editMode, setEditMode] = useState(false);

    const toggleEditMode = () => {
        setEditMode(() => !editMode);
    }
    return (
        <>
            <div className={styles.chapterContainer}>
                <div className={styles.headerContainer}>
                    <header className={styles.header}>
                        Chapters
                    </header>
                    {editMode || (
                        <button 
                            className={styles.editBtn}
                            onClick={toggleEditMode}
                        >
                            EDIT
                            <FontAwesomeIcon icon={faPen} />
                        </button>
                    )}
                    {editMode && (
                        <button 
                            className={styles.doneBtn}
                            onClick={toggleEditMode}
                        >Done</button>
                    )}
                </div>
                {editMode && (
                    <button className={styles.addChapterBtn}>
                        Add Chapter
                    </button>
                )}
                <ul className={styles.chapterList}>
                    {chaptersArr.map((chapter) => {
                        return (
                            <Chapter 
                                chapter={chapter} 
                                editMode={editMode}
                                key={chapter}
                            />
                        )
                    })}
                </ul>
            </div>
        </>
    )
}



export default ChapterContainer;