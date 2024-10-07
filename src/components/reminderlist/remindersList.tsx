import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@reduxjs/toolkit/query';

const ReminderList = () => {
    // Get the list of card sets from Redux store
    const cardsetsList = useSelector((state: RootState) => state.cardsets);

    // Function to calculate time difference in days:hours:minutes
    const formatTimeDifference = (reminderTime: Date | null) => {
      if (!reminderTime) return "No reminder set";
  
      const currentTime = new Date().getTime();
      const reminderTimeMs = new Date(reminderTime).getTime();
      
      const diffMs = reminderTimeMs - currentTime; // Time difference in milliseconds
      
      if (diffMs <= 0) return "Recall Session Overdue"; // In case the reminder time is in the past
  
      // Convert milliseconds into days, hours, and minutes
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  
      return `Recall in ${diffDays} days : ${diffHours} hours : ${diffMinutes} minutes`;
    };
  
    return (
      <div className="cardset-container">
        <h1>Recall Times</h1>
        <div className="scrollable-div">
          <ul>
            {cardsetsList.map((cardset: any) => (
              <li key={cardset.setId}>
                <h2>{cardset.title}:</h2>
                <span>{formatTimeDifference(cardset.reminderTime)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };


export default ReminderList;
