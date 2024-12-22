import { useState, useRef, useEffect } from 'react';
import styles from './Topic.module.css';
import TextArea from '../../../TextEditor.jsx';

const Topic = ({ topicName, topicObj, editMode, subjectsObj, setSubjectsObj, selectedChapter, selectedSubject, updateObjValue }) => {
    const textareaRef = useRef(null);
    const [description, setDescription] = useState(topicObj.description);
    useEffect(() => {
        setDescription(topicObj.description);
    }, [topicObj])
    const subtopicsArr = Object.keys(topicObj.subtopics);
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'; // Reset height
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height to fit content
        }
    }, [description]); // Trigger whenever the description changes
    const handleDescriptionChange = (e) => {
        const newDescription = e.target.value;
        setDescription(newDescription); // Update local state
        subjectsObj[selectedSubject][selectedChapter][topicName]['description'] = e.target.value;
        localStorage.setItem('subjects', JSON.stringify(subjectsObj));
        setSubjectsObj({...subjectsObj})
    };
    return (
        <details className={styles.topicContainer}>
            <summary>
                <span>
                    {topicName}
                </span>
                {editMode && <button>Edit</button>}
            </summary>
            {editMode ? (
                <textarea
                    ref={textareaRef}
                    className='description'
                    value={description}
                    onChange={handleDescriptionChange}
                    placeholder="Add a description..."
                />
            ) : (
                <textarea
                    ref={textareaRef}
                    className={description ? 'descriptionReadOnly': 'hidden'}
                    value={description}
                    readOnly
                />
            )}
            <TextArea></TextArea>
        </details>
    )
}



export default Topic;