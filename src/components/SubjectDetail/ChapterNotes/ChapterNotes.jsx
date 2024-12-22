import { useState } from 'react';
import styles from './ChapterNotes.module.css'
import Topic from './Topic/Topic.jsx';







const ChapterNotes = ({selectedChapter, selectedSubject, subjectsObj, setSubjectsObj}) => {
    if (selectedChapter) {
        const updateObjValue = (obj, locationArr, value) => {
            let current = obj
            for (let i = 0; i < locationArr.length - 1; i++) {
                current = current[locationArr[i]];                
            }
            current[locationArr[locationArr.length - 1]] = value;
        }
        const topicsObj = subjectsObj[selectedSubject][selectedChapter];     
        const topicsArr = Object.keys(topicsObj);
        const [editMode, setEditMode] = useState(false);
        const toggleEditMode = () => {
            setEditMode(() => !editMode);
        }
        const addTopic = () => {
            let input = prompt('enter Topic Name');
            subjectsObj[selectedSubject][chapter][input] = {subtopics:{}};
            
            localStorage.setItem('subjects', JSON.stringify(subjectsObj));
            setSubjectsObj({...subjectsObj});
        }
        
        return (
            <div className={styles.notesContainer}>
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
                    
                {topicsArr.map((topicName) => {
                    return (
                        <Topic 
                            key={topicName}
                            topicName={topicName}
                            topicObj={topicsObj[topicName]}
                            editMode={editMode}
                            setSubjectsObj={setSubjectsObj}
                            subjectsObj={subjectsObj}
                            selectedSubject={selectedSubject}
                            selectedChapter={selectedChapter}
                            updateObjValue={updateObjValue}
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


