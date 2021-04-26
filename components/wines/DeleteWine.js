import { headers } from '../../hooks/swr-switch';

import DeleteButton from '../styles/DeleteButton';

export default function DeleteWine({ setDeleteMessage, setErrorMessage, id }) {
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
