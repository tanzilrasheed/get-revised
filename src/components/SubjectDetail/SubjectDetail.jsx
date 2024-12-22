import { Link, useLocation } from 'react-router-dom';
import styles from './SubjectDetail.module.css';
import ChapterContainer from './ChapterContainer/ChapterContainer.jsx';
import ChapterNotes from './ChapterNotes/ChapterNotes.jsx';
import { useState } from 'react';

const SubjectDetail = ({}) => {    
    const [subjectsObj, setSubjectsObj] = useState(JSON.parse(localStorage.getItem("subjects")) || {});
    const [selectedChapter, setSelectedChapter] = useState('');
    const selectedSubject = useLocation().state?.subject;

    if (selectedSubject) {
        return (
            <>  
                <header className={styles.header}>
                    <h1>{selectedSubject}</h1>
                </header>
                <Link to='/notes' className={styles.backBtn}>Go back</Link>
                <main className={styles.main}>
                    <ChapterContainer 
                        selectedSubject={selectedSubject}
                        selectedChapter={selectedChapter}
                        setSelectedChapter={setSelectedChapter}
                        subjectsObj={subjectsObj}
                        setSubjectsObj={setSubjectsObj}
                    />
                    <ChapterNotes
                        selectedSubject={selectedSubject}
                        selectedChapter={selectedChapter}
                        subjectsObj={subjectsObj}
                        setSubjectsObj={setSubjectsObj}
                    />
                </main>
            </>
        )
    } else {
        return (
            <div className={styles.notSelectedMessage}>
                <h1>No Subject Selected</h1>
            </div>
        )
    }
    
}


export default SubjectDetail;