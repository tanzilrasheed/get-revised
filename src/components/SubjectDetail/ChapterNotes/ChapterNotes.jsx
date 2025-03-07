import { useEffect, useState } from 'react';
import styles from './ChapterNotes.module.css'
import Topic from './Topic/Topic.jsx';


const ChapterNotes = ({selectedChapter, selectedSubject, subjectsObj, setSubjectsObj, topicsArr, setTopicsArr}) => {
    if (selectedChapter) {
        
        const [editMode, setEditMode] = useState(false);
        const toggleEditMode = () => {
            setEditMode(() => !editMode);
        }
        const addTopic = () => {
            let input = prompt('enter Topic Name');
            subjectsObj[selectedSubject][selectedChapter][input] = {description:''};
            localStorage.setItem('subjects', JSON.stringify(subjectsObj));
            setSubjectsObj({...subjectsObj});
            setTopicsArr([...topicsArr, input]);
        }
        
        return (
            <div className={styles.notesContainer}>
                <div className={styles.chapterHeaderContainer}>
                    <header className={styles.chapterHeader}>
                        <h1 className={styles.chapterName}>{selectedChapter}</h1>
                        {editMode ? (
                            <button
                                className={styles.doneBtn}
                                onClick={toggleEditMode}
                            >Done</button>
                        ) : (
                            <button 
                                className={styles.chapterEditBtn}
                                onClick={toggleEditMode}
                            >Edit</button>
                        )}
                    </header>
                    {editMode && (
                        <div className={styles.addTopicDiv}>
                            <button 
                                className={styles.addTopicBtn}
                                onClick={addTopic}
                            >Add Topic</button>
                        </div>
                    )}
                </div>
                    
                {topicsArr.map((topicName) => {
                    return (
                        <Topic 
                            key={topicName}
                            topicName={topicName}
                            topicObj={subjectsObj[selectedSubject][selectedChapter][topicName]}
                            editMode={editMode}
                            setSubjectsObj={setSubjectsObj}
                            subjectsObj={subjectsObj}
                            selectedSubject={selectedSubject}
                            selectedChapter={selectedChapter}
                            setTopicsArr={setTopicsArr}
                        />
                    )
                })}
            </div>
        )
    } else {
        return (
            <div className={styles.emptyChapterNotesDiv}>
                no chapter selected
            </div>
        )
    }
}


export default ChapterNotes;


