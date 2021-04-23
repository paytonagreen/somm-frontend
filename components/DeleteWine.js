import { api, headers } from '../hooks/swr-switch';

import DeleteButton from './styles/DeleteButton';

export default function DeleteWine({ id }) {
  function deleteWine() {
    fetch(`${api}/wines/${id}`, {
      method: `DELETE`,
      headers,
    })
      .then((res) => res.json())
      .then(async (data) => {
        await data;
        setData(data);
      });
  }

  return <DeleteButton onClick={deleteWine}>Delete</DeleteButton>;
}
