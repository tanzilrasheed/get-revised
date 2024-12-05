import { useState, useRef, useEffect } from 'react';
import styles from './EditForm.module.css';

const EditForm = ({ editSubject, setEditFormVisible, subjectsObj, editObjProperty, setSubjectsObj }) => {
    const [inputValue, setInputValue] = useState(editSubject);
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [editSubject])

    const handleSave = (e) => {
        e.preventDefault();
        if (inputValue.trim() === '') {
            alert('Subject name can not be empty')
            return;
        } else if (subjectsObj[inputValue.trim()] === undefined) {
            setEditFormVisible(false);
            let updatedObj = editObjProperty(subjectsObj, editSubject, inputValue);
            setSubjectsObj(updatedObj);
            localStorage.setItem("subjects", JSON.stringify(updatedObj));
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
        console.log(e.target.value);
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