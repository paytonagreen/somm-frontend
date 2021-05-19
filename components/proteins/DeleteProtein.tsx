import { headers, myFetch } from 'lib/utils';
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
  async function deleteProtein() {
    const url = `api/proteins/${id}`;
    const options = {
      method: `DELETE`,
      headers,
    };
    const mutateString = 'api/proteins';
    const successMessage = 'Protein deleted!'
    await myFetch(
      url,
      options,
      mutateString,
      setDeleteMessage,
      setErrorMessage,
      successMessage
    );
  }

  return <DeleteButton onClick={deleteProtein}>Delete</DeleteButton>;
};

export default DeleteProtein;
