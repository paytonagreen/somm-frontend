import { useState } from 'react';

import { useProtein, useCurrentUser } from 'hooks/swr-hooks';

import ProteinWinesList from './ProteinWinesList';
import DeleteProtein from './DeleteProtein';
import Card from '../styles/Card';
import Loader from '../reusable/Loader';

export default function Protein({ id }) {
  const { data } = useCurrentUser();
  const { protein, isLoading } = useProtein(id);
  const [deleteMessage, setDeleteMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();

  if (!id) return <p></p>;
  if (isLoading) return <Loader />;
  return (
    <Card key={protein.id}>
      <div key={protein.id}>
        {deleteMessage && <p>{deleteMessage}</p>}
        {!deleteMessage && errorMessage && <p>{errorMessage}</p>}
        <h1>{protein.protein_name}</h1>
        <ProteinWinesList id={id} />
        <div className='button-div'>
          {data && data.user && data.user.is_admin && id && (
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
