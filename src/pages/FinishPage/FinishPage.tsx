import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';
import  styles  from './FinishPage.module.css';
import WipeButton from '../../components/wipeButton/wipeButton';

const FinishedPage = () => {
  const { setName } = useParams<{ setName: string }>(); // Assuming you're passing the study set name as a route param

  //customize this to dynamically calculate the next review time
  const recommendedReviewTime = "2 days"; 

  return (
    <div className={`container ${styles.finishedPage} mt-5`}>
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 text-center">
          {/* Big Nice Job */}
          <h1 className={styles.niceJob}>Nice Job</h1>

          {/* Big checkmark */}
          <i className={`${PrimeIcons.CHECK} ${styles.checkmark}`} />

          {/* Message about completion */}
          <p className={styles.completionMessage}>
            You have completed <strong>{setName}</strong> study set. <br />
            For best results, you should recall the set in <strong>{recommendedReviewTime}</strong>.
          </p>

          <WipeButton/>
        </div>
      </div>
    </div>
  );
};

export default FinishedPage;
