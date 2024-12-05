import { useLocation } from 'react-router-dom';
import styles from './SubjectDetail.module.css';
import ChapterContainer from '../ChapterContainer/ChapterContainer.jsx';


const SubjectDetail = ({}) => {    
    console.log(useLocation().state);
    
    const selectedSubject = useLocation().state?.subject;
    const subjectsObj = useLocation().state?.subjectsObj || {};
    const setSubjectsObj = useLocation().state?.setSubjectsObj || (() => {});
    if (selectedSubject) {
        return (
            <>  
                <header className={styles.header}>
                    <h1>{selectedSubject}</h1>
                </header>
                <ChapterContainer 
                    chaptersArr={Object.keys(subjectsObj[selectedSubject])}
                    subjectsObj={subjectsObj}
                    setSubjectsObj={setSubjectsObj}
                />
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