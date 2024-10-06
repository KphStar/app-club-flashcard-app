import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';
import NavBar from '../../components/navbar/NavBar';
import CardsetList from '../../components/cardsetlist/cardsetList';


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
            <h1>Card Sets</h1>
            <CardsetList></CardsetList>
          </div>
          <div className={`col-md-6 ${styles.currStreaks} ${styles.spacing}`}>
            <h1>Current Streaks</h1>
          </div>
        </div>
      </div>

      <NavBar></NavBar>
    </>
  );
};

export default HomePage;
