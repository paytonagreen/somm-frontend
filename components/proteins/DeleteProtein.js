import { headers } from '../../hooks/swr-switch';

import DeleteButton from '../styles/DeleteButton';

export default function DeleteProtein({ setErrorMessage, setDeleteMessage, id }) {
  function deleteProtein() {
    fetch(`api/proteins/${id}`, {
      method: `DELETE`,
      headers,
    })
      .then(async (res) => {
        const data = await(res.json())
        if (!res.ok) {
          throw Error(data.message)
        } else {
          setDeleteMessage('Protein deleted!')
        }
      })
      .catch((err) => {
        setErrorMessage(err.message)
      })
  }

  return <DeleteButton onClick={deleteProtein}>Delete</DeleteButton>;
}
