import { Dispatch, SetStateAction } from 'react';

import { headers } from 'hooks/swr-switch';

import DeleteButton from '../styles/DeleteButton';

interface Props {
  setErrorMessage: Dispatch<SetStateAction<string>>;
  setDeleteMessage: Dispatch<SetStateAction<string>>;
  id: number;
}

const DeleteSauce: React.FC<Props> = ({
  setErrorMessage,
  setDeleteMessage,
  id,
}) => {
  function deleteSauce() {
    fetch(`api/sauces/${id}`, {
      method: `DELETE`,
      headers,
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw Error(data.message);
        } else {
          setDeleteMessage('Sauce deleted!');
        }
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  }

  return <DeleteButton onClick={deleteSauce}>Delete</DeleteButton>;
};

export default DeleteSauce;