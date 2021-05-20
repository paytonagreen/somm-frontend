import { headers, myFetch, sentenceCase } from 'lib/utils';
import React, { Dispatch, SetStateAction } from 'react';
import DeleteButton from '../styles/DeleteButton';

interface DeleteItemProps {
  id: number;
  itemType: string;
  setDeleteMessage: Dispatch<SetStateAction<String>>;
  setErrorMessage: Dispatch<SetStateAction<String>>;
}

const DeleteItem: React.FC<DeleteItemProps> = ({
  id,
  itemType,
  setDeleteMessage,
  setErrorMessage,
}) => {
  async function deleteItem() {
    const url = `api/${itemType}s/${id}`;
    const options = {
      method: 'DELETE',
      headers,
    };
    const mutateString = `api/${itemType}s`
    const successMessage = `${sentenceCase(itemType)} deleted!`;
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
