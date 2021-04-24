import { useState } from 'react';

import { useProtein } from '../hooks/swr-hooks';

import WinesList from './WinesList';
import DeleteProtein from './DeleteProtein';
import ProteinCard from './styles/ProteinCard';

export default function Protein({ id }) {
  const { protein, isLoading } = useProtein(id);
  const [deleteMessage, setDeleteMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();

  if (!id) return <p></p>;
  if (isLoading) return <p>'Loading...'</p>;
  return (
    <ProteinCard key={protein.id}>
      <div key={protein.id}>
        {deleteMessage && <p>{deleteMessage}</p>}
        {!deleteMessage && errorMessage && <p>{errorMessage}</p>}
        <h1>{protein.protein_name}</h1>
        <WinesList id={id} />
        <div className='button-div'>
          {id && (
            <DeleteProtein
              setErrorMessage={setErrorMessage}
              setDeleteMessage={setDeleteMessage}
              id={id}
            />
          )}
        </div>
      </div>
    </ProteinCard>
  );
}
