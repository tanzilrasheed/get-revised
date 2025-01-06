import React, { useState, useRef, useEffect, useMemo } from 'react';
import Subject from './Subject/Subject.jsx';
import styles from './SubjectContainer.module.css';
import EditForm from '../EditForm/EditForm.jsx';


const SubjectContainer = () => {
    const [subjectsObj, setSubjectsObj] = useState(JSON.parse(localStorage.getItem("subjects")) || {});
    const [isAddSubjectVisible, setAddSubjectVisible] = useState(true);
    const [inputValue, setInputValue] = useState('');
    const [isEditFormVisible, setEditFormVisible] = useState(false);
    const [editValue, setEditValue] = useState(null);

    const inputRef = useRef(null); // Create a ref for the input
    const subjectList = Object.keys(subjectsObj).reverse();


    const toggleAddSubject = () => {
        setAddSubjectVisible((prev) => !prev);
    };
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }
    useEffect(() => {
        if (!isAddSubjectVisible) {
          inputRef.current?.select(); // Ensure the input is focused and selected
        }
    }, [isAddSubjectVisible]); // Run only when isAddSubjectVisible changes

    const handleSave = (e) =>  {
        e.preventDefault();
        if (inputValue.length > 50) {
            alert('SubjectContainer name should be less than 50 characters');
            return;
        }
        if (inputValue) {
            if (subjectsObj[inputValue.trim()] === undefined) {
                toggleAddSubject();
                setInputValue('');
                subjectsObj[inputValue] = {};
                localStorage.setItem("subjects", JSON.stringify(subjectsObj))
            } else {
                alert(`${inputValue.trim()} is already present`)
            }
        } else {
            alert('please write Subject name');
        }
    }


    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSave(e);
        }
    }

    const handleCancel = () => {
        toggleAddSubject();
        setInputValue('');
    }

    

    return (
        <>
            {isEditFormVisible && (
                <EditForm 
                    editValue={editValue}
                    setEditFormVisible={setEditFormVisible} 
                    subjectsObj={subjectsObj}
                    setSubjectsObj={setSubjectsObj}
                />
            )}
            <section className={styles.subjectSection}>
                <header>
                    <h2 className={styles.Heading}>Subjects:</h2>
                </header>
                {isAddSubjectVisible &&
                    <button 
                    className={styles.button}
                    onClick={toggleAddSubject}
                    >
                        Add Subject
                    </button>}
                {!isAddSubjectVisible && (
                    <>
                        <input
                            type="text"
                            className={styles.input}
                            onChange={handleInputChange}
                            ref={inputRef}
                            onKeyDown={handleKeyDown}
                            />
                        <button 
                            className={styles.button}
                            onClick={handleSave}
                            >
                            Save
                        </button>
                        <button 
                            className={styles.button}
                            onClick={handleCancel}
                            >
                            Cancel
                        </button>
                    </>)
                }
                    {!Boolean(subjectList.length) &&
                        (<div className={styles.noSubjectMessage}>
                            <p>
                                There is no subject to display, please add some
                            </p>
                        </div>)
                    }
                <ul className={styles.subjectContainerDiv}>
                    {subjectList.map((subject) => {
                        return (
                            <Subject
                                key={subject}
                                subject={subject}
                                subjectsObj={subjectsObj}
                                setSubjectsObj={setSubjectsObj}
                                setEditFormVisible={setEditFormVisible}
                                setEditValue={setEditValue}
                            />
                        );
                    })}
                </ul>
            </section>
        </>
    )
}


export default SubjectContainer;