import { useState, useRef, useEffect } from 'react';
import styles from './Topic.module.css';
import TextArea from '../../../TextEditor/TextEditor.jsx';

const Topic = ({ topicName, topicObj, editMode, subjectsObj, setSubjectsObj, selectedChapter, selectedSubject, updateObjValue }) => {
    const [description, setDescription] = useState(topicObj.description);
    useEffect(() => {
        setDescription(topicObj.description);
    }, [selectedChapter])
    return (
        <div className={styles.topicContainer}>
            <div className={styles.topicHeading}>
                <span>
                    {topicName}
                </span>
                {editMode && (
                    <div className={styles.topicHeadingBtn}>
                        <button>Edit</button> 
                        <button>Delete</button>
                    </div>
                )}
            </div>
            <TextArea 
                editMode={editMode}
                description={topicObj.description}
                setDescription={setDescription}
                selectedSubject={selectedSubject}
                selectedChapter={selectedChapter}
                topicName={topicName}
                subjectsObj={subjectsObj}
                setSubjectsObj={setSubjectsObj}
            />
        </div>
    )
}



export default Topic;