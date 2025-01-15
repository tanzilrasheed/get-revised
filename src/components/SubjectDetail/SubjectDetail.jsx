import { Link, useLocation } from 'react-router-dom';
import styles from './SubjectDetail.module.css';
import ChapterContainer from './ChapterContainer/ChapterContainer.jsx';
import ChapterNotes from './ChapterNotes/ChapterNotes.jsx';
import { useState } from 'react';

const SubjectDetail = ({}) => {    
    const [subjectsObj, setSubjectsObj] = useState(JSON.parse(localStorage.getItem("subjects")) || {});
    const [selectedChapter, setSelectedChapter] = useState('');
    const selectedSubject = useLocation().state?.subject;
    const [topicsArr, setTopicsArr] = useState([]);
    const [isChapterContainerVisible, setChapterContainerVisible] = useState(true);
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
                        setTopicsArr={setTopicsArr}
                    />
                    <ChapterNotes
                        selectedSubject={selectedSubject}
                        selectedChapter={selectedChapter}
                        subjectsObj={subjectsObj}
                        setSubjectsObj={setSubjectsObj}
                        topicsArr={topicsArr}
                        setTopicsArr={setTopicsArr}
                    />
                </main>
                <main className={styles.mainPhoneView}>
                    <div className={styles.toggleBtnDiv}>
                    <button 
                        onClick={() => {
                            setChapterContainerVisible(!isChapterContainerVisible);
                        }}
                        className={styles.toggleBtn}
                    >☰</button>
                    </div>
                    {isChapterContainerVisible ? (                        
                        <ChapterContainer 
                            selectedSubject={selectedSubject}
                            selectedChapter={selectedChapter}
                            setSelectedChapter={setSelectedChapter}
                            subjectsObj={subjectsObj}
                            setSubjectsObj={setSubjectsObj}
                            setTopicsArr={setTopicsArr}
                        />
                    ) : (
                        <ChapterNotes
                            selectedSubject={selectedSubject}
                            selectedChapter={selectedChapter}
                            subjectsObj={subjectsObj}
                            setSubjectsObj={setSubjectsObj}
                            topicsArr={topicsArr}
                            setTopicsArr={setTopicsArr}
                        />
                    )}
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