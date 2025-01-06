import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Subject.module.css';


const  Subject = React.memo(({ subject, subjectsObj, setSubjectsObj, setEditFormVisible, setEditValue}) => {
    const revisionTopics = JSON.parse(localStorage.getItem('revisionTopics') || {});
    const handleEdit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setEditFormVisible(true);
        setEditValue(subject);
    }

    
    const handleDelete = (e) => {
        e.preventDefault();
        e.stopPropagation();
        delete subjectsObj[subject];
        localStorage.setItem("subjects", JSON.stringify(subjectsObj));
        setSubjectsObj(JSON.parse(localStorage.getItem("subjects")));
        if (revisionTopics[subject] !== undefined) {
            delete revisionTopics[subject];
            localStorage.setItem('revisionTopics', JSON.stringify(revisionTopics));
        }
    }


    return (
    <>
        <li 
            key={subject}
            className={styles.li}
        >
            <Link to={'/subject-detail'} className={styles.subject} state={{subject}}>
                <p className={styles.subjectName}>
                    {subject}
                </p>
                <div className={styles.actionsContainer}>
                    <button
                        className={`${styles.editButton} ${styles.button}`}
                        onClick={handleEdit}
                    >
                        EDIT
                    </button>
                    <button 
                        className={`${styles.deleteButton} ${styles.button}`}
                        onClick={(e) => handleDelete(e)}
                    >
                        DELETE
                    </button>
                </div>
            </Link>
        </li>
    </>)
});




export default Subject;