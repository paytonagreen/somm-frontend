import { useState } from 'react';

import { useSauce } from 'hooks/swr-hooks';

import SauceWinesList from './SauceWinesList';
import DeleteSauce from './DeleteSauce';
import Card from '../styles/Card';

export default function Sauce({ id, currentUser }) {
  const { sauce, isLoading } = useSauce(id);
  const [deleteMessage, setDeleteMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();

  if (!id) return <p></p>;
  if (isLoading) return <p>'Loading...'</p>;

  return (
    <Card key={sauce.id}>
      <div key={sauce.id}>
        {deleteMessage && <p>{deleteMessage}</p>}
        {!deleteMessage && errorMessage && <p>{errorMessage}</p>}
        <h1>{sauce.Sauce_name}</h1>
        <SauceWinesList id={id} />
        <div className='button-div'>
          {id && currentUser.is_admin && (
            <DeleteSauce
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
