import React from 'react';
import styles from './Breadcrumb.module.css';

const Breadcrumb = ({ setSubjectSectionVisible, setSubjectDetailVisible, breadcrumbArr }) => {
    const subjects = JSON.parse(localStorage.getItem("subjects"));
    const BreadcrumbItem = subjects;
    const handleBreadcrumbClick = (index) => {
        if (index === 0) {
            setSubjectSectionVisible(false);
            setSubjectDetailVisible(true);
        } else if(index > 0) {
            setSubjectDetailVisible(false);
        }
    }

    return (
        <nav className={styles.breadcrumbNav}>
            <button
                onClick={() => {
                    setSubjectSectionVisible(true);
                    setSubjectDetailVisible(false);
                }}
                className={styles.breadcrumbItem}
            >
                Subjects
            </button>
            {">"}
            {breadcrumbArr.map((item, index) => {
            return (<React.Fragment key={index + 1}>
                    <button 
                        onClick={index === breadcrumbArr.length - 1 ? null:handleBreadcrumbClick}
                        className={index === breadcrumbArr.length - 1 ? styles.breadcrumbItemCurrent:styles.breadcrumbItem}
                    >
                        {item}
                    </button>
                    <span>
                        {index < breadcrumbArr.length - 1 && ">"}
                    </span>
                </React.Fragment>)
            })}
        </nav>)
};

export default Breadcrumb;