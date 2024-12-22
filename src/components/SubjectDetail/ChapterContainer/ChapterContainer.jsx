import { useState } from 'react';
import Chapter from '../Chapter/Chapter.jsx'
import styles from './ChapterContainer.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";


const ChapterContainer = ({ selectedSubject, selectedChapter, setSelectedChapter, subjectsObj, setSubjectsObj }) => {
    const [editMode, setEditMode] = useState(false);
    const [chaptersArr, setChapterArr] = useState(Object.keys(subjectsObj[selectedSubject]));
    
    const toggleEditMode = () => {
        setEditMode(() => !editMode);
    }

    const handleAddChapter = () => {
        const input = prompt('enter chapter name');
        subjectsObj[selectedSubject][input] = {introduction:{subtopics:{}, description:'', points:[]}};
        localStorage.setItem('subjects', JSON.stringify(subjectsObj));
        setChapterArr(Object.keys(subjectsObj[selectedSubject]));
        setSubjectsObj({...subjectsObj});
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
                    <button 
                        className={styles.addChapterBtn}
                        onClick={handleAddChapter}
                    >
                        Add Chapter
                    </button>
                )}
                <ul className={styles.chapterList}>
                    {chaptersArr.map((chapter) => {
                        return (
                            <Chapter 
                                key={chapter}
                                chapter={chapter} 
                                editMode={editMode}
                                subjectsObj={subjectsObj}
                                setChapterArr={setChapterArr}
                                selectedSubject={selectedSubject}
                                selectedChapter={selectedChapter}
                                setSelectedChapter={setSelectedChapter}
                            />
                        )
                    })}
                </ul>
            </div>
        </>
    )
}



export default ChapterContainer;