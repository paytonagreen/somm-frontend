import { useState } from 'react';

import DeleteButton from './styles/DeleteButton';

export default function DeleteWine({id}) {
    const [data, setData] = useState();

    function deleteWine() {
        fetch(`http://127.0.0.1:7777/wines/${id}`, {
          method: `DELETE`,
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then(async (data) => {
            await data;
            setData(data);
          });
      }

    return (
        <DeleteButton onClick={deleteWine}>Delete</DeleteButton>
    )
}
