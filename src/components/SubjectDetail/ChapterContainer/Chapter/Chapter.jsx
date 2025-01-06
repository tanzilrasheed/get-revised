import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { editObjProperty } from "../../../Components";
import styles from './Chapter.module.css';


const Chapter = React.memo(({ chapter, editMode, selectedSubject, setChapterArr, selectedChapter, setSelectedChapter, subjectsObj, setSubjectsObj, setTopicsArr }) => {
    const revisionTopics = JSON.parse(localStorage.getItem('revisionTopics')) || {};
    const handleEdit = (e) => {
        e.stopPropagation()
        let input = prompt('edit below', chapter);
        if (input === null) {
            return;
        } else if (input.trim()){
            const editedChaptersObj = editObjProperty(subjectsObj[selectedSubject], chapter, input);
            if (selectedChapter === chapter) {
                setSelectedChapter(input);
            }
            chapter = input;
            subjectsObj[selectedSubject] = editedChaptersObj;
            localStorage.setItem('subjects', JSON.stringify(subjectsObj));
            setSubjectsObj({...subjectsObj});
            setChapterArr(Object.keys(subjectsObj[selectedSubject]));
            console.log('newChapter: ', input);
        } else {
            alert("Chapter name can't be empty");
        }
    }

    const handleDelete = (e) => {
        e.preventDefault();
        e.stopPropagation();
        delete subjectsObj[selectedSubject][chapter];
        localStorage.setItem("subjects", JSON.stringify(subjectsObj));
        setChapterArr(Object.keys(subjectsObj[selectedSubject]));
        if (revisionTopics[selectedSubject][chapter] !== undefined) {
            delete revisionTopics[selectedSubject][chapter];
            if (Object.keys(revisionTopics[selectedSubject]).length === 0) {
                delete revisionTopics[selectedSubject];
            }
            localStorage.setItem('revisionTopics', JSON.stringify(revisionTopics));
        }         
    }

    const selectChapter = () => {
        setSelectedChapter(chapter);
        let topicsObj = subjectsObj[selectedSubject][chapter];     
        setTopicsArr(Object.keys(topicsObj));
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