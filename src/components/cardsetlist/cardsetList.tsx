import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';
import { Menubar } from 'primereact/menubar';
import {MenuItem} from 'primereact/menuitem/menuitem';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';

import { Button } from 'primereact/button';
import { DataScroller } from 'primereact/datascroller';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';

const CardsetList = () => {
    const navigate: any = useNavigate();
    
    const flashcardSets = useSelector((state: RootState) => state.flashcards.flashcardSets);

    const flashcardSetArray = Object.entries(flashcardSets).map(([setId, set]) => ({
        setId,
        ...set
    }));


    interface FlashcardItem {
        setid: string;
        title: string;
        description: string;
    }

    const itemTemplate = (data: FlashcardItem) => {
        return (
            <div className="col-12">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    <div className="flex flex-column lg:flex-row justify-content-between align-items-center xl:align-items-start lg:flex-1 gap-4">
                        <div className="flex flex-column align-items-center lg:align-items-start gap-3">
                            <div className="flex flex-column gap-1">
                                <div className="text-2xl font-bold text-900">{data.title}</div>
                                <div className="text-700">{data.description}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="card">
                <DataScroller value={flashcardSetArray} itemTemplate={itemTemplate} rows={5} inline scrollHeight="500px" header="" />
            </div>
        </>
    );
};

export default CardsetList;