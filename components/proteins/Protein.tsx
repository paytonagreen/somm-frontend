import { useState } from 'react';

import { useProtein, useCurrentUser } from 'hooks/swr-hooks';

import ProteinWinesList from './ProteinWinesList';
import DeleteProtein from './DeleteProtein';
import Card from '../styles/Card';
import Loader from '../reusable/Loader';

interface Props {
  id: number;
}

const Protein: React.FC<Props> = ({ id }) => {
  const { data } = useCurrentUser();
  const { protein, isLoading } = useProtein(id);
  const [deleteMessage, setDeleteMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  if (isLoading) return <Loader />;
  return (
    <Card key={protein.id}>
      <div key={protein.id}>
        {deleteMessage && <p>{deleteMessage}</p>}
        {!deleteMessage && errorMessage && <p>{errorMessage}</p>}
        <h1>{protein.name}</h1>
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
};

export default Protein;