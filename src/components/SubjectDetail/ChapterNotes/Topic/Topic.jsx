import { useState, useRef, useEffect } from 'react';
import styles from './Topic.module.css';
import TextArea from '../../../TextEditor/TextEditor.jsx';
import { editObjProperty } from '../../../Components';
const Topic = ({ topicName, topicObj, editMode, subjectsObj, setSubjectsObj, selectedChapter, selectedSubject, setTopicsArr }) => {
    const [description, setDescription] = useState(topicObj.description);
    const revisionTopics = JSON.parse(localStorage.getItem('revisionTopics')) || {};
    useEffect(() => {
        setDescription(topicObj.description);
    }, [selectedChapter]);
    
    const handleEdit = (e) => {
        let input = prompt('enter new topic name', topicName);        
        if (input === null) {
            return;
        } else if (input.trim()) {
            const editedTopicsObj = editObjProperty(subjectsObj[selectedSubject][selectedChapter], topicName, input);
            subjectsObj[selectedSubject][selectedChapter] = editedTopicsObj;
            localStorage.setItem('subjects', JSON.stringify(subjectsObj));
            if (revisionTopics[selectedSubject]) {
                if (revisionTopics[selectedSubject][selectedChapter]) {
                    if (revisionTopics[selectedSubject][selectedChapter].includes(topicName)) {
                        revisionTopics[selectedSubject][selectedChapter].splice(revisionTopics[selectedSubject][selectedChapter].indexOf(topicName), 1, input);
                        localStorage.setItem('revisionTopics', JSON.stringify(revisionTopics));
                    }
                }
            }
            topicName = input;
            setSubjectsObj({...subjectsObj});
            setTopicsArr(Object.keys(subjectsObj[selectedSubject][selectedChapter]));
        } else {
            alert("Topic name can't be empty");
        }
    }

    const handleDelete = (e) => {
        let confirmation = prompt('type "y" to delete').toLowerCase();
        if (confirmation === 'y') {
            delete subjectsObj[selectedSubject][selectedChapter][topicName];
            localStorage.setItem("subjects", JSON.stringify(subjectsObj));
            setTopicsArr(Object.keys(subjectsObj[selectedSubject][selectedChapter]));
            const topics = revisionTopics[selectedSubject][selectedChapter];
            if (topics.includes(topicName)) {
                topics.splice(topics.indexOf(topicName), 1);
                if (topics.length === 0) {
                    delete revisionTopics[selectedSubject][selectedChapter];
                    if (Object.keys(revisionTopics[selectedSubject]).length === 0) {
                        delete revisionTopics[selectedSubject];
                    }
                }
                localStorage.setItem('revisionTopics', JSON.stringify(revisionTopics));
            }
        }
    }

    const handleSchedule = () => {
        subjectsObj[selectedSubject][selectedChapter][topicName]['date'] = new Date();
        subjectsObj[selectedSubject][selectedChapter][topicName]['totalRevision'] = 0;
        setSubjectsObj({...subjectsObj});
        localStorage.setItem('subjects', JSON.stringify(subjectsObj));
        if (revisionTopics[selectedSubject]) {
            if (revisionTopics[selectedSubject][selectedChapter]) {
                revisionTopics[selectedSubject][selectedChapter].push(topicName);
            } else {
                revisionTopics[selectedSubject][selectedChapter] = [topicName];
            }
        } else {
            revisionTopics[selectedSubject] = {};
            revisionTopics[selectedSubject][selectedChapter] = [topicName];
        }
        localStorage.setItem('revisionTopics', JSON.stringify(revisionTopics));
    }
    return (
        <div className={styles.topicContainer}>
            <div className={styles.topicHeading}>
                <span>
                    {topicName}
                </span>
                {editMode && (
                    <div className={styles.topicHeadingBtn}>
                        <button onClick={handleEdit}>Edit</button> 
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
                (subjectsObj[selectedSubject][selectedChapter][topicName]['totalRevision'] === undefined) &&
                <button onClick={handleSchedule}>schedule</button>
            )}
        </div>
    )
}



export default Topic;