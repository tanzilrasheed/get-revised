import React from 'react';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';
import spacedRevisionImg from "../../assets/spaced-revision.png";

const Home = () => {
    return (
        <>
            <div className={styles.home}>
                <h1 className={styles.aboutHeading}>How This Website Works</h1>
                <div className={styles.aboutDescription}>
                    <p>
                        Our website uses a scientifically proven technique called spaced revision to help you remember things better. Instead of studying everything at once, we space out your revision sessions so you can review topics at the right time. This method has been shown to improve memory and help you remember information for a longer time.
                        <br />
                        <br />
                        By using spaced revision, we make learning easier and more effective. You’ll study smarter, not harder, and focus on the areas where you need more practice, helping you learn faster and remember longer.
                    </p>
                    <img src={spacedRevisionImg} alt="spaced-revision-img" />
                </div>
                <div className={styles.notesHeading}>
                    <h2>Go to Notes section</h2>
                    <Link to='/notes'>click</Link>
                </div>
                <div className={styles.revisionHeading}>
                    <h2>Go to Revision section</h2>
                    <Link to='/notes'>click</Link>
                </div>
            </div>
        </>
    );
};

export default Home;