import React, { useState } from "react";
import RevisionTopic from '../../components/RevisionTopic/RevisionTopic.jsx';
import styles from './Revision.module.css';

const Revision = () => {
  const subjectsObj = JSON.parse(localStorage.getItem('subjects') || {});
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
  // const revisionTopics = {'Python': {'Strings':['introduction'], 'Variables and Data Types':['introduction']}, "Javascript": {'Array\'': ['introduction']}};
  const revisionTopics = {'Python': {'Variables and Data Types':['introduction', 'bekar']}};
  const todayTopics = [];
  const todayDate = new Date();
  for (let subject in revisionTopics) {
    for (let chapter in revisionTopics[subject]) {
      console.log(chapter);
      
      for (let topic of revisionTopics[subject][chapter]) {
        console.log(new Date(subjectsObj[subject][chapter][topic].date).getTime(), todayDate.getTime());
        
        if (subjectsObj[subject][chapter][topic].totalRevision === 0 && (new Date(subjectsObj[subject][chapter][topic].date).getTime() + 600000 <= todayDate.getTime() && new Date(subjectsObj[subject][chapter][topic].date).getTime() + 18000000 >= todayDate.getTime())) { //check if first revision then time is 10 mins more and 5 hours less
          todayTopics.push([subject, chapter, topic]);
        } else if (subjectsObj[subject][chapter][topic].totalRevision === 1 && (new Date(subjectsObj[subject][chapter][topic].date.setDate(subjectsObj[subject][chapter][topic].date.getDate() + 1).toLocaleDateString()) <= new Date(todayDate.toLocaleDateString()) && new Date(subjectsObj[subject][chapter][topic].date.setDate(subjectsObj[subject][chapter][topic].date.getDate() + 2).toLocaleDateString()) <= new Date(todayDate.toLocaleDateString()))) {
          todayTopics.push([subject, chapter, topic]);
        } else if (subjectsObj[subject][chapter][topic].totalRevision === 2 && (new Date(subjectsObj[subject][chapter][topic].date.setDate(subjectsObj[subject][chapter][topic].date.getDate() + 3).toLocaleDateString()) <= new Date(todayDate.toLocaleDateString()) && new Date(subjectsObj[subject][chapter][topic].date.setDate(subjectsObj[subject][chapter][topic].date.getDate() + 5).toLocaleDateString()) <= new Date(todayDate.toLocaleDateString()))) {
          todayTopics.push([subject, chapter, topic]);
        } else if (subjectsObj[subject][chapter][topic].totalRevision === 3 && (new Date(subjectsObj[subject][chapter][topic].date.setDate(subjectsObj[subject][chapter][topic].date.getDate() + 7).toLocaleDateString()) <= new Date(todayDate.toLocaleDateString()) && new Date(subjectsObj[subject][chapter][topic].date.setDate(subjectsObj[subject][chapter][topic].date.getDate() + 10).toLocaleDateString()) <= new Date(todayDate.toLocaleDateString()))) {
          todayTopics.push([subject, chapter, topic]);
        } else if (subjectsObj[subject][chapter][topic].totalRevision === 4 && (new Date(subjectsObj[subject][chapter][topic].date.setDate(subjectsObj[subject][chapter][topic].date.getDate() + 14).toLocaleDateString()) <= new Date(todayDate.toLocaleDateString()) && new Date(subjectsObj[subject][chapter][topic].date.setDate(subjectsObj[subject][chapter][topic].date.getDate() + 21).toLocaleDateString()) <= new Date(todayDate.toLocaleDateString()))) {
          todayTopics.push([subject, chapter, topic]);
        } else if (subjectsObj[subject][chapter][topic].totalRevision === 5 && (new Date(subjectsObj[subject][chapter][topic].date.setDate(subjectsObj[subject][chapter][topic].date.getDate() + 30).toLocaleDateString()) <= new Date(todayDate.toLocaleDateString()) && new Date(subjectsObj[subject][chapter][topic].date.setDate(subjectsObj[subject][chapter][topic].date.getDate() + 45).toLocaleDateString()) <= new Date(todayDate.toLocaleDateString()))) {
          todayTopics.push([subject, chapter, topic]);
        }
      }
    }
  }
  const totalTopics = todayTopics.length;
  if (currentTopicIndex < totalTopics) {
    return (
      <>
      <div className={styles.revisionContainer}>
        <header className={styles.header}>
          Revision
        </header>
        <main className={styles.mainContainer}>
          <RevisionTopic 
            topicLocationArr={todayTopics[currentTopicIndex]} 
            currentTopicIndex={currentTopicIndex} 
            setCurrentTopicIndex={setCurrentTopicIndex}
          />
        </main>
      </div>
      </>
    )
  } else {
    return (
      <div>
        No topics to revise right now please check later
      </div>
    )
  }
}

export default Revision; // <-- Add default export
