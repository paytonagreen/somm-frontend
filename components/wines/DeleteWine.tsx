import { headers } from 'lib/utils';
import { Dispatch, SetStateAction } from 'react';

import DeleteButton from '../styles/DeleteButton';

interface Props {
  setDeleteMessage: Dispatch<SetStateAction<string>>;
  setErrorMessage: Dispatch<SetStateAction<string>>;
  id: number;
}

const DeleteWine: React.FC<Props> = ({ setDeleteMessage, setErrorMessage, id }) => {
  function deleteWine() {
    fetch(`api/wines/${id}`, {
      method: `DELETE`,
      headers,
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw Error(data.message);
        } else {
          setDeleteMessage('Wine deleted!');
        }
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  }

  return <DeleteButton onClick={deleteWine}>Delete</DeleteButton>;
}

export default DeleteWine