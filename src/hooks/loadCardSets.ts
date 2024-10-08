import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Cardset } from '../shared/interfaces';
import { setCardSets } from '../state/cardsets/cardsetsSlice';

export const useLoadCardSets = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Call the Electron API to read the metadata files
    window.electron.readAllMetadata().then((data: Cardset[]) => {
      // Dispatch the Redux action to update the card sets in the store
      dispatch(setCardSets(data));
    }).catch((error) => {
      console.error("Failed to load card sets:", error);
    });
  }, [dispatch]);

  // Return function to allow reloading if needed later
  const reloadCardSets = () => {
    window.electron.readAllMetadata().then((data: Cardset[]) => {
      dispatch(setCardSets(data));
    }).catch((error) => {
      console.error("Failed to load card sets:", error);
    });
  };

  return { reloadCardSets };
};
