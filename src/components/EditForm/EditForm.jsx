import { useState, useRef, useEffect } from 'react';
import { editObjProperty } from '../Components';
import styles from './EditForm.module.css';

const EditForm = ({ editValue, setEditFormVisible, subjectsObj, setSubjectsObj }) => {
    const [inputValue, setInputValue] = useState(editValue);
    const revisionTopics = JSON.parse(localStorage.getItem('revisionTopics')) || {};
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [editValue]);

    const handleSave = (e) => {
        e.preventDefault();
        if (inputValue.trim() === '') {
            alert('Subject name can not be empty');
            return;
        } else if (subjectsObj[inputValue.trim()] === undefined) {
            setEditFormVisible(false);
            const updatedRevisionTopics = editObjProperty(revisionTopics, editValue, inputValue);
            const updatedObj = editObjProperty(subjectsObj, editValue, inputValue);
            setSubjectsObj(updatedObj);
            localStorage.setItem("subjects", JSON.stringify(updatedObj));
            localStorage.setItem("revisionTopics", JSON.stringify(updatedRevisionTopics));
        } else {
            alert(`${inputValue.trim()} name already present`);
        }
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setEditFormVisible(false);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSave(e);
        }
    }


    const handleChange = (e) => {
        setInputValue(e.target.value);
    }

    return (
        <>
            <dialog className={styles.formDialog}>
                <form className={styles.form}>
                    <p>Edit Below</p>
                    <input 
                        type="text" 
                        onKeyDown={handleKeyDown}
                        onChange={handleChange}
                        value={inputValue}
                        ref={inputRef}
                    />
                    <button
                        onClick={handleSave}
                    >Save</button>
                    <button
                        onClick={handleCancel}
                    >Cancel</button>
                </form>
            </dialog>
        </>
    )
}


export default EditForm;