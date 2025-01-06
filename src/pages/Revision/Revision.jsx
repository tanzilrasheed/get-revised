import React, { useState } from "react";
import RevisionTopic from '../../components/RevisionTopic/RevisionTopic.jsx';
import styles from './Revision.module.css';

const Revision = () => {
  const subjectsObj = JSON.parse(localStorage.getItem('subjects') || {});
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
  const revisionTopics = JSON.parse(localStorage.getItem('revisionTopics')) || {};
  console.log(revisionTopics);
  
  const todayTopics = [];
  const todayDate = new Date();
  for (let subject in revisionTopics) {
    for (let chapter in revisionTopics[subject]) {
      for (let topic of revisionTopics[subject][chapter]) {   
        let todayDateString = subjectsObj[subject][chapter][topic].date;
        if (subjectsObj[subject][chapter][topic].totalRevision === 0 && (new Date(todayDateString).getTime()   <= todayDate.getTime() && new Date(todayDateString).getTime() + 18000000 >= todayDate.getTime())) { //check if first revision then time is 10 mins more and 5 hours less
          todayTopics.push([subject, chapter, topic]);
        } else if (subjectsObj[subject][chapter][topic].totalRevision === 1 && (new Date(todayDateString).setDate(new Date(todayDateString).getDate() + 1)) <= new Date(todayDate) && new Date(new Date(todayDateString).setDate(new Date(todayDateString).getDate() + 2)) <= new Date(todayDate)) {
          todayTopics.push([subject, chapter, topic]);
        } else if (subjectsObj[subject][chapter][topic].totalRevision === 2 && (new Date(new Date(todayDateString).setDate(new Date(todayDateString).getDate() + 3)) <= new Date(todayDate) && new Date(new Date(todayDateString).setDate(new Date(todayDateString).getDate() + 5)) <= new Date(todayDate))) {
          todayTopics.push([subject, chapter, topic]);
        } else if (subjectsObj[subject][chapter][topic].totalRevision === 3 && (new Date(new Date(todayDateString).setDate(new Date(todayDateString).getDate() + 7)) <= new Date(todayDate) && new Date(new Date(todayDateString).setDate(new Date(todayDateString).getDate() + 10)) <= new Date(todayDate))) {
          todayTopics.push([subject, chapter, topic]);
        } else if (subjectsObj[subject][chapter][topic].totalRevision === 4 && (new Date(new Date(todayDateString).setDate(new Date(todayDateString).getDate() + 14)) <= new Date(todayDate) && new Date(new Date(todayDateString).setDate(new Date(todayDateString).getDate() + 21)) <= new Date(todayDate))) {
          todayTopics.push([subject, chapter, topic]);
        } else if (subjectsObj[subject][chapter][topic].totalRevision === 5 && (new Date(new Date(todayDateString).setDate(new Date(todayDateString).getDate() + 30)) <= new Date(todayDate) && new Date(subjectsObj[subject][chapter][topic].date.setDate(subjectsObj[subject][chapter][topic].date.getDate() + 45).toLocaleDateString()) <= new Date(todayDate.toLocaleDateString()))) {
          todayTopics.push([subject, chapter, topic]);
        }
      }
    }
  }
  console.log(todayTopics);
  
  const totalTopics = todayTopics.length;
  if (currentTopicIndex < totalTopics) {
    return (
      <>
      <div className={styles.revisionContainer}>
        <header className={styles.header}>
          Revision
        </header>
        <main className={styles.mainContainer}>
          {currentTopicIndex}
          <RevisionTopic 
            topicLocationArr={todayTopics[currentTopicIndex]}
            currentTopicIndex={currentTopicIndex} 
            setCurrentTopicIndex={setCurrentTopicIndex}
            todayTopics={todayTopics}
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
