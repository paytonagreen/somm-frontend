import { headers, myFetch } from 'lib/utils';
import { Dispatch, SetStateAction } from 'react';

import DeleteButton from '../styles/DeleteButton';

interface Props {
  setDeleteMessage: Dispatch<SetStateAction<string>>;
  setErrorMessage: Dispatch<SetStateAction<string>>;
  id: number;
}

const DeleteWine: React.FC<Props> = ({
  setDeleteMessage,
  setErrorMessage,
  id,
}) => {
  async function deleteWine() {
    const url = `api/wines/${id}`;
    const options = {
      method: `DELETE`,
      headers,
    };
    const mutateString = 'api/wines';
    if (confirm('Are you sure you want to delete this?')) {
      await myFetch(
        url,
        options,
        mutateString,
        setDeleteMessage,
        setErrorMessage
      );
    }
  }

  return <DeleteButton onClick={deleteWine}>Delete</DeleteButton>;
};

export default DeleteWine;
