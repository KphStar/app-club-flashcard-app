import React from 'react';
import { Link } from 'react-router-dom';
import styles from './cardsetList.module.css';
import { Menubar } from 'primereact/menubar';
import {MenuItem} from 'primereact/menuitem/menuitem';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@reduxjs/toolkit/query';




const CardsetList = () => {
    
    
    const cardsetsList = useSelector((state: RootState) => state.cardsets);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    
    return (
        <div className="cardset-container">
          <h1>Card Sets</h1>
          <div className="scrollable-div">
            <ul>
              {cardsetsList.map((cardset: any) => (
                <li key={cardset.setId}>
                  <h2
                    onClick={() => navigate(`/study/${cardset.setId}`)} //change back to preview
                    style={{ cursor: 'pointer', color: 'blue' }}
                  >
                    {cardset.title}
                  </h2>
                  <p>{cardset.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    };

export default CardsetList;