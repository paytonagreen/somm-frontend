import { useState } from 'react';

import { useProtein } from '../../hooks/swr-hooks';

import ProteinWinesList from './ProteinWinesList';
import DeleteProtein from './DeleteProtein';
import Card from '../styles/Card';

export default function Protein({ currentUser, id }) {
  const { protein, isLoading } = useProtein(id);
  const [deleteMessage, setDeleteMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();

  if (!id) return <p></p>;
  if (isLoading) return <p>'Loading...'</p>;
  return (
    <Card key={protein.id}>
      <div key={protein.id}>
        {deleteMessage && <p>{deleteMessage}</p>}
        {!deleteMessage && errorMessage && <p>{errorMessage}</p>}
        <h1>{protein.protein_name}</h1>
        <ProteinWinesList id={id} />
        <div className='button-div'>
          {currentUser && id && (
            <DeleteProtein
              setErrorMessage={setErrorMessage}
              setDeleteMessage={setDeleteMessage}
              id={id}
            />
          )}
        </div>
      </div>
    </Card>
  );
}
