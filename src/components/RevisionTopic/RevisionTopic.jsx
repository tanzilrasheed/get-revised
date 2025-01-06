import { useEffect, useState } from "react";
import TextEditor from "../../../../get-revised/src/components/TextEditor/TextEditor";
import styles from './RevisionTopic.module.css'

const RevisionTopic = ({ topicLocationArr, currentTopicIndex, setCurrentTopicIndex, todayTopics }) => {
    const [subjectsObj, setSubjectsObj] = useState(JSON.parse(localStorage.getItem('subjects')) || {});
    const [subject, chapter, topic] = topicLocationArr
    const [description, setDescription] = useState(subjectsObj[subject][chapter][topic]['description']);
    const [editMode, setEditMode] = useState(false);
    const toggleEditMode = () => {
        setEditMode(!editMode);
    }
    
    return (
        <div className={styles.TopicContainer}>
            {topicLocationArr.join('/')}
            {editMode ? (
                <button onClick={toggleEditMode}>Done</button>
            ) : (
                <button onClick={toggleEditMode}>Edit</button>
            )}
            <TextEditor 
                editMode={editMode}
                description={description}
                setDescription={setDescription}
                selectedSubject={topicLocationArr[0]}
                selectedChapter={topicLocationArr[1]}
                topicName={topicLocationArr[2]}
                subjectsObj={subjectsObj}
                setSubjectsObj={setSubjectsObj}
            />
                {/* {(subjectsObj[subject][chapter][topic]['description'])} */}
            <div>
                <button 
                    onClick={() => {
                        subjectsObj[subject][chapter][topic].totalRevision = subjectsObj[subject][chapter][topic].totalRevision + 1;
                        localStorage.setItem('subjects', JSON.stringify(subjectsObj));
                        setCurrentTopicIndex(() => currentTopicIndex + 1);   
                        const [newSubject, newChapter, newTopic] = todayTopics[currentTopicIndex + 1]; 
                        if (todayTopics.length > currentTopicIndex + 1) {
                            setDescription(subjectsObj[newSubject][newChapter][newTopic]['description']);  
                        }
                    }}
                    className={styles.nextBtn}
                >next</button>
            </div>
        </div>
    )
}


export default RevisionTopic;