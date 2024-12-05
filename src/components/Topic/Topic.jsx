import styles from './Topic.module.css';


const Topic = ({ topic }) => {
    console.log(topic);
    
    return (
        <li className={styles.topic}>
            {topic}
            <div>
                <button>EDIT</button>
                <button>DELETE</button>
            </div>
        </li>
    )
}


export default Topic;