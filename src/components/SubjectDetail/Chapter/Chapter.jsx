import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import styles from './Chapter.module.css';


const Chapter = React.memo(({ chapter, editMode, subjectsObj, selectedSubject, setChapterArr, selectedChapter, setSelectedChapter }) => {

    const handleEdit = () => {
        let input = prompt('edit below', chapter);
        // subjectsObj[selectedSubject][chapter]
    }

    const handleDelete = (e) => {
        e.preventDefault();
        e.stopPropagation();
        delete subjectsObj[selectedSubject][chapter];
        localStorage.setItem("subjects", JSON.stringify(subjectsObj));
        setChapterArr(Object.keys(subjectsObj[selectedSubject]))
    }

    const selectChapter = () => {
        setSelectedChapter(chapter);        
    }
    return (
        <>
            <li 
                className={chapter == selectedChapter ? styles.selectedChapter:styles.chapter}
                onClick={selectChapter}
            >
                <span>
                    {chapter}
                </span>
                {editMode && (
                    <div>
                        <button 
                            className={styles.editBtn}
                            onClick={handleEdit}
                        >
                            <FontAwesomeIcon icon={faPen} />
                        </button>
                        <button 
                            className={styles.deleteBtn}
                            onClick={handleDelete}
                        >Delete</button>
                    </div>
                )}
            </li>
        </>
    )
});



export default Chapter;