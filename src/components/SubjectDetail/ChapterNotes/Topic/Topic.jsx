import { useState, useRef, useEffect } from 'react';
import styles from './Topic.module.css';
import TextArea from '../../../TextEditor/TextEditor.jsx';

const Topic = ({ topicName, topicObj, editMode, subjectsObj, setSubjectsObj, selectedChapter, selectedSubject, updateObjValue, setTopicsArr }) => {
    const [description, setDescription] = useState(topicObj.description);
    useEffect(() => {
        setDescription(topicObj.description);
    }, [selectedChapter])

    const handleDelete = (e) => {
        let confirmation = prompt('type "y" to delete').toLowerCase();
        if (confirmation === 'y') {
            delete subjectsObj[selectedSubject][selectedChapter][topicName];
            localStorage.setItem("subjects", JSON.stringify(subjectsObj));
            setTopicsArr(Object.keys(subjectsObj[selectedSubject][selectedChapter]));
        }
    }

    return (
        <div className={styles.topicContainer}>
            <div className={styles.topicHeading}>
                <span>
                    {topicName}
                </span>
                {editMode && (
                    <div className={styles.topicHeadingBtn}>
                        <button>Edit</button> 
                        <button onClick={handleDelete}>Delete</button>
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
            {editMode && (
                <button>schedule</button>
            )}
        </div>
    )
}



export default Topic;