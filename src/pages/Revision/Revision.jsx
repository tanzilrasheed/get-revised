import React, { useState } from "react";
import RevisionTopic from '../../components/RevisionTopic/RevisionTopic.jsx';
import styles from './Revision.module.css';

const Revision = () => {
  const subjectsObj = JSON.parse(localStorage.getItem('subjects')) || {};
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
  const revisionTopics = JSON.parse(localStorage.getItem('revisionTopics')) || {};
  
  const todayTopics = [];
  const todayDate = new Date();
  for (let subject in revisionTopics) {
    for (let chapter in revisionTopics[subject]) {
      for (let topic of revisionTopics[subject][chapter]) {   
        let scheduleDate = subjectsObj[subject][chapter][topic].date;
        // if (subjectsObj[subject][chapter][topic].totalRevision === 0 && (new Date(scheduleDate).getTime()  + 600000 <= todayDate.getTime() && new Date(scheduleDate).getTime() + 18000000 >= todayDate.getTime())) { //check if first revision then time is 10 mins more and 5 hours less
        //   todayTopics.push([subject, chapter, topic]);
        // } else if (subjectsObj[subject][chapter][topic].totalRevision === 1 && (new Date(scheduleDate).setDate(new Date(scheduleDate).getDate() + 1)) <= new Date(todayDate) && new Date(scheduleDate).setDate(new Date(scheduleDate).getDate() + 2) >= new Date(todayDate)) {
        //   todayTopics.push([subject, chapter, topic]);
        // } else if (subjectsObj[subject][chapter][topic].totalRevision === 2 && (new Date(scheduleDate).setDate(new Date(scheduleDate).getDate() + 3)) <= new Date(todayDate) && new Date(scheduleDate).setDate(new Date(scheduleDate).getDate() + 5) >= new Date(todayDate)) {
        //   todayTopics.push([subject, chapter, topic]);
        // } else if (subjectsObj[subject][chapter][topic].totalRevision === 3 && (new Date(scheduleDate).setDate(new Date(scheduleDate).getDate() + 7)) <= new Date(todayDate) && new Date(scheduleDate).setDate(new Date(scheduleDate).getDate() + 10) >= new Date(todayDate)) {
        //   todayTopics.push([subject, chapter, topic]);
        // } else if (subjectsObj[subject][chapter][topic].totalRevision === 4 && (new Date(scheduleDate).setDate(new Date(scheduleDate).getDate() + 14)) <= new Date(todayDate) && new Date(scheduleDate).setDate(new Date(scheduleDate).getDate() + 21) >= new Date(todayDate)) {
        //   todayTopics.push([subject, chapter, topic]);
        // } else if (subjectsObj[subject][chapter][topic].totalRevision === 5 && (new Date(scheduleDate).setDate(new Date(scheduleDate).getDate() + 30)) <= new Date(todayDate) && new Date(scheduleDate).setDate(new Date(scheduleDate).getDate() + 45) >= new Date(todayDate)) {
        //   todayTopics.push([subject, chapter, topic]);
        // }
        if (subjectsObj[subject][chapter][topic].totalRevision === 0 && (new Date(scheduleDate).getTime()  + 600000 <= todayDate.getTime())) { //check if first revision then time is 10 mins more and 5 hours less
          todayTopics.push([subject, chapter, topic]);
        } else if (subjectsObj[subject][chapter][topic].totalRevision === 1 && (new Date(scheduleDate).setDate(new Date(scheduleDate).getDate() + 1)) <= new Date(todayDate)) {
          todayTopics.push([subject, chapter, topic]);
        } else if (subjectsObj[subject][chapter][topic].totalRevision === 2 && (new Date(scheduleDate).setDate(new Date(scheduleDate).getDate() + 3)) <= new Date(todayDate)) {
          todayTopics.push([subject, chapter, topic]);
        } else if (subjectsObj[subject][chapter][topic].totalRevision === 3 && (new Date(scheduleDate).setDate(new Date(scheduleDate).getDate() + 7)) <= new Date(todayDate)) {
          todayTopics.push([subject, chapter, topic]);
        } else if (subjectsObj[subject][chapter][topic].totalRevision === 4 && (new Date(scheduleDate).setDate(new Date(scheduleDate).getDate() + 14)) <= new Date(todayDate)) {
          todayTopics.push([subject, chapter, topic]);
        } else if (subjectsObj[subject][chapter][topic].totalRevision === 5 && (new Date(scheduleDate).setDate(new Date(scheduleDate).getDate() + 30)) <= new Date(todayDate)) {
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
