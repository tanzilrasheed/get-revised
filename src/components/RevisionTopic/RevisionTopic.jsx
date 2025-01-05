import { useState } from "react";
import TextEditor from "../../../../../get-revised/src/components/TextEditor/TextEditor";
import styles from './RevisionTopic.module.css'

const RevisionTopic = ({ topicLocationArr, currentTopicIndex, setCurrentTopicIndex }) => {
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
                selectedSubject={'Python'}
                selectedChapter={'Strings'}
                topicName={'introduction'}
                subjectsObj={subjectsObj}
                setSubjectsObj={setSubjectsObj}
            />
            <div>
                <button 
                    onClick={() => {
                    setCurrentTopicIndex(currentTopicIndex + 1);
                    }}
                    className={styles.nextBtn}
                >next</button>
            </div>
        </div>
    )
}


export default RevisionTopic;