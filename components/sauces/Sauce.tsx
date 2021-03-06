import { useState } from 'react';

import { useCurrentUser, useSauce } from 'hooks/swr-hooks';

import SauceGrapesList from './SauceGrapesList';
import Card from '../styles/Card';
import Loader from '../reusable/Loader';
import DeleteItem from '../reusable/DeleteItem';

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
        <SauceGrapesList id={id} />
        <div className='button-div'>
          {data && data.user && data.user.is_admin && id && (
            <DeleteItem
              setErrorMessage={setErrorMessage}
              setDeleteMessage={setDeleteMessage}
              id={id}
              itemType='sauce'
            />
          )}
        </div>
      </div>
    </Card>
  );
};

export default Sauce;
