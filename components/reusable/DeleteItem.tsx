import { headers, myFetch } from 'lib/utils';
import React, { Dispatch, SetStateAction } from 'react';
import DeleteButton from '../styles/DeleteButton';

interface DeleteItemProps {
  id: number;
  urlPrefix: string;
  itemType: string;
  mutateString: string;
  setDeleteMessage: Dispatch<SetStateAction<String>>;
  setErrorMessage: Dispatch<SetStateAction<String>>;
}

const DeleteItem: React.FC<DeleteItemProps> = ({
  id,
  urlPrefix,
  itemType,
  mutateString,
  setDeleteMessage,
  setErrorMessage,
}) => {
  async function deleteItem() {
    const url = `${urlPrefix}${id}`;
    const options = {
      method: 'DELETE',
      headers,
    };
    const successMessage = `${itemType} deleted!`;
    if (confirm('Are you sure you want to delete this?')) {
      await myFetch(
        url,
        options,
        mutateString,
        setDeleteMessage,
        setErrorMessage,
        successMessage
      );
    }
  }

  return <DeleteButton onClick={deleteItem}>Delete</DeleteButton>;
};

export default DeleteItem;
