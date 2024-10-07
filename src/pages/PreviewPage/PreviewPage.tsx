import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { RootState } from '@reduxjs/toolkit/query';
import { useSelector } from 'react-redux';

const PreviewPage = () => {
  const { setId } = useParams<{ setId: string }>(); // Get the setId from the URL
  const cardsets = useSelector((state: RootState) => state.cardsets); // Get the list of cardsets from the Redux store

  // Find the cardset that matches the setId from the URL
  const selectedCardset = cardsets.find((set: any) => set.setId === setId);

  return (
    <div>
      <h1>Preview Set ID: {setId}</h1>
      {selectedCardset ? (
        <div>
          <h2>{selectedCardset.title}</h2>
          <p>{selectedCardset.description}</p>
          <p>Reminder Time: {selectedCardset.reminderTime?.toLocaleString()}</p>
        </div>
      ) : (
        <p>Set not found</p>
      )}
    </div>
  );
};

export default PreviewPage;
