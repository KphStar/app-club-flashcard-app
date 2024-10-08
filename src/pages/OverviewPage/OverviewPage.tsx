import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@reduxjs/toolkit/query';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import { useLoadCardSets } from '../../hooks/loadCardSets';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import styles from './OverviewPage.module.css';
import { Cardset } from '../../shared/interfaces';

const OverviewPage = () => {
  const dispatch = useDispatch();
  useLoadCardSets(); // Reload card sets when visiting the overview page
  const navigate = useNavigate(); // Create navigate instance for routing

  const cardsetsList = useSelector((state: RootState) => state.cardsets);

  const randomColor = () => {
    const colors = ['#ff6347', '#ffa500', '#00ff00', '#1e90ff', '#9370db'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="container mt-4">
      <h1 className={styles.pageTitle}>Overview of Card Sets</h1>
      <div className="row">
        {cardsetsList.map((cardset: Cardset, index: any) => (
          <div className="col-md-4 mb-4" key={index}>
            <Card className={styles.cardStyle} style={{ margin: '10px', padding: '20px' }}>
              <h2 className={styles.cardTitle} style={{ color: randomColor() }}>{cardset.title}</h2>
              <ul className={styles.cardContent}>
                <li>{cardset.description}</li>
                <li>Recall Time: {cardset.reminderTime ? new Date(cardset.reminderTime).toLocaleDateString() : 'No reminder set'}</li>
                <li>Number of Cards: {cardset.numCards}</li>
              </ul>
              <div className={styles.centerButton}> {/* Centered the button */}
                <Button label="Preview" onClick={() => navigate(`/preview/${cardset.setId}`)}  />
                <Button label="Edit" onClick={() => navigate(`/edit/${cardset.setId}`)} className="p-button-outlined p-button-secondary" style={{ marginLeft: '10px' }} />
              </div>
              <p className={styles.setId}>Set ID: {cardset.setId}</p>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverviewPage;
