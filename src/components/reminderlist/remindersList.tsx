import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@reduxjs/toolkit/query';
import styles from './remindersList.module.css'; // Fixed import

const ReminderList = () => {
  const cardsetsList = useSelector((state: RootState) => state.cardsets);
  const [timeDifferences, setTimeDifferences] = useState<string[]>([]);
  const [randomColors, setRandomColors] = useState<string[]>([]); // Store random colors in state

  // Function to calculate time difference in days:hours:minutes
  const formatTimeDifference = (reminderTime: Date | null) => {
    if (!reminderTime) return 'No reminder set';

    const currentTime = new Date().getTime();
    const reminderTimeMs = new Date(reminderTime).getTime();
    const diffMs = reminderTimeMs - currentTime;

    if (diffMs <= 0) return 'Recall Session Overdue';

    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return `Recall in ${diffDays} days : ${diffHours} hours : ${diffMinutes} minutes`;
  };

  // Generate random colors excluding blue
  const getRandomColor = () => {
    const colors = ['#FF6347', '#FFA500', '#00FF00', '#9370DB'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(() => {
    const updatedTimes = cardsetsList.map((cardset: any) =>
      formatTimeDifference(cardset.reminderTime)
    );
    setTimeDifferences(updatedTimes);

    // Generate and store random colors for each cardset
    const generatedColors = cardsetsList.map(() => getRandomColor());
    setRandomColors(generatedColors);

  }, [cardsetsList]);

  return (
    <div className={styles.cardsetContainer}>
      <h1 className={styles.header}>Recall Times</h1>
      <div className={styles.fixedHeightDiv}>
        <ul>
          {cardsetsList.slice(0, 3).map((cardset: any, index: number) => (
            <li key={cardset.setId}>
              <h2
                style={{ color: randomColors[index] }} // Use the pre-generated random color
              >
                {cardset.title}:
              </h2>
              <p>{timeDifferences[index]}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReminderList;
