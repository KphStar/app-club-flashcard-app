import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';
import CardsetList from '../../components/cardsetlist/cardsetList';
import ReminderList from '../../components/reminderlist/remindersList';


const HomePage = () => {
  return (
    <>
      <div className={styles.title}>
        <h1>Home Page</h1>
        <p>Welcome, Use this app to help study for exams, learn new languages, or do anything that requires memorization!</p>
      </div>

      <div className="container">
        <div className="row">
          <div className={`col-md-6 ${styles.cardSets} ${styles.spacing}`}>
            <CardsetList/>
          </div>
          <div className={`col-md-6 ${styles.currStreaks} ${styles.spacing}`}>
            <ReminderList/>
          </div>
        </div>
      </div>

    </>
  );
};

export default HomePage;
