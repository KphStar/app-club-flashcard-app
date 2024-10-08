import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';
import CardsetList from '../../components/cardsetlist/cardsetList';
import ReminderList from '../../components/reminderlist/remindersList';
import { Card } from 'primereact/card'; // Ensure PrimeReact's Card component is used

const HomePage = () => {
  return (
    <>
      <div className={styles.title}>
        <h1>Home Page</h1>
        <p>Welcome, Use this app to help study for exams, learn new languages, or do anything that requires memorization!</p>
      </div>

      <div className="container mt-4">
        <div className="row">
          <div className={`col-md-6 ${styles.cardSets} ${styles.spacing}` }>
            <Card className={styles.cardStyle} style={{ margin: '20px', padding: '20px' }}>
              <CardsetList />
            </Card>
          </div>

          <div className={`col-md-6 ${styles.currStreaks} ${styles.spacing}` }>
            <Card className={styles.cardStyle} style={{ margin: '20px', padding: '20px' }}>
              <ReminderList />
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;

