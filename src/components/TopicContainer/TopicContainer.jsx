import { useState } from 'react';
import styles from './TopicContainer.module.css';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import Topic from '../Topic/Topic.jsx';

const TopicContainer = ({ selectedSubject, setSubjectSectionVisible, setSubjectDetailVisible }) => {
    const [topicsObj, setTopicsObj] = useState(JSON.parse(localStorage.getItem("subjects"))[selectedSubject] || {});
    const [breadcrumbArr, setBreadcrumbArr] = useState([selectedSubject]);



    const topicList = Object.keys(topicsObj).reverse();
    console.log(topicList);
    
    return (
        <>
            <section>
                <Breadcrumb
                    breadcrumbArr={breadcrumbArr}
                    setSubjectSectionVisible={setSubjectSectionVisible}
                    setSubjectDetailVisible={setSubjectDetailVisible}
                />
                <header> 
                    <h2 className={styles.heading}>{selectedSubject}</h2>
                </header>
                <button>Add Topic</button>
                <ul>
                    {topicList.map((topic, index) => {
                        return (
                            <Topic 
                                key={topic}
                                topic={topic}
                            />
                        )
                    })}
                </ul>
            </section>
        </>
    )
}


export default TopicContainer;