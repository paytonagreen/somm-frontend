import { headers, myFetch } from 'lib/utils';
import { Dispatch, SetStateAction } from 'react';

import DeleteButton from '../styles/DeleteButton';

interface Props {
  setDeleteMessage: Dispatch<SetStateAction<string>>;
  setErrorMessage: Dispatch<SetStateAction<string>>;
  id: number;
}

const DeleteGrape: React.FC<Props> = ({
  setDeleteMessage,
  setErrorMessage,
  id,
}) => {
  async function deleteGrape() {
    const url = `api/grapes/${id}`;
    const options = {
      method: `DELETE`,
      headers,
    };
    const mutateString = 'api/grapes';
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

  return <DeleteButton onClick={deleteGrape}>Delete</DeleteButton>;
};

export default DeleteGrape;
