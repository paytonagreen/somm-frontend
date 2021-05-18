import { useState } from 'react';

import { useCurrentUser, useSauce } from 'hooks/swr-hooks';

import SauceWinesList from './SauceWinesList';
import DeleteSauce from './DeleteSauce';
import Card from '../styles/Card';
import Loader from '../reusable/Loader';

interface Props {
  id: number;
}

const Sauce: React.FC<Props> = ({ id }) => {
  const { data } = useCurrentUser();
  const { sauce } = useSauce(id);
  const [deleteMessage, setDeleteMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();

  if (!sauce) return <Loader />;
  return (
    <Card key={sauce.id}>
      <div key={sauce.id}>
        {deleteMessage && <p>{deleteMessage}</p>}
        {!deleteMessage && errorMessage && <p>{errorMessage}</p>}
        <h1>{sauce.name}</h1>
        <SauceWinesList id={id} />
        <div className='button-div'>
          {data && data.user && data.user.is_admin && id && (
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
};

export default Sauce;