import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import styles from './Chapter.module.css';


const Chapter = React.memo(({ chapter, editMode }) => {
    return (
        <>
            <li className={styles.chapter}>
                <span>
                    {chapter}
                </span>
                {editMode && (
                    <div>
                        <button className={styles.editBtn}>
                            <FontAwesomeIcon icon={faPen} />
                        </button>
                        <button className={styles.deleteBtn}>Delete</button>
                    </div>
                )}
            </li>
        </>
    )
});



export default Chapter;