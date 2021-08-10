import React, { useState } from 'react';

import { useWine, useCurrentUser } from 'hooks/swr-hooks';

import Card from '../styles/Card';
import Loader from '../reusable/Loader';
import DeleteItem from '../reusable/DeleteItem';

interface Props {
  id: number;
}

const Wine: React.FC<Props> = ({ id }) => {
  const { data } = useCurrentUser();
  const { wine, isLoading } = useWine(id);
  const [deleteMessage, setDeleteMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  if (!wine) return <Loader />;
  return (
    <Card key={wine.id}>
      <div key={wine.id}>
        {deleteMessage && <p>{deleteMessage}</p>}
        {!deleteMessage && errorMessage && <p>{errorMessage}</p>}
        <h1>{wine.name}</h1>
        <p>Producer: {wine.producer}</p>
        {wine.has_vintage ? (<p>Vintage: {wine.vintage}</p>) : <p>Non-Vintage</p>}
        <p>Country: {wine.country}</p>
        <p>Region: {wine.region}</p>
        {wine.subregion && (<p>{wine.subregion}</p>)}

        <div className='button-div'>
          {data && data.user && data.user.is_admin && id && (
            <DeleteItem
              setErrorMessage={setErrorMessage}
              setDeleteMessage={setDeleteMessage}
              id={id}
              itemType="wine"
            />
          )}
        </div>
      </div>
    </Card>
  );
};

export default Wine;
