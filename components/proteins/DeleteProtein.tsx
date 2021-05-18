import { headers } from 'hooks/swr-switch';
import { Dispatch, SetStateAction } from 'react';

import DeleteButton from '../styles/DeleteButton';

interface Props {
  setErrorMessage: Dispatch<SetStateAction<String>>;
  setDeleteMessage: Dispatch<SetStateAction<String>>;
  id: number;
}

const DeleteProtein: React.FC<Props> = ({
  setErrorMessage,
  setDeleteMessage,
  id,
}) => {
  function deleteProtein() {
    fetch(`api/proteins/${id}`, {
      method: `DELETE`,
      headers,
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw Error(data.message);
        } else {
          setDeleteMessage('Protein deleted!');
        }
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  }

  return <DeleteButton onClick={deleteProtein}>Delete</DeleteButton>;
};

export default DeleteProtein;
