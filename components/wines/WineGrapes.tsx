import { usePaginatedGrapes, useWineGrapes } from 'hooks/swr-hooks';
import React, { useState } from 'react';
import { Wine } from 'types';
import Loader from '../reusable/Loader';
import ThingList from '../reusable/ThingList';
import ThingListStyles from '../styles/ThingListStyles';

interface WineGrapesProps {
    wine: Wine
}

const WineGrapes: React.FC<WineGrapesProps> = ({wine}) => {
  const [page, setPage] = useState(1);
  const [savingStarted, setSavingStarted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  console.log(wine.id);
  const { wineGrapes } = useWineGrapes(wine.id);

  if (!wineGrapes) return <Loader />;
  console.log(wineGrapes);
  return (
    <ThingListStyles>
        <h2>{wine.name} Grapes</h2>
        {wineGrapes.map((grape) => {
            return (
                <p>{grape.name}</p>
            )
        })}
    </ThingListStyles>
  );
};

export default WineGrapes;
