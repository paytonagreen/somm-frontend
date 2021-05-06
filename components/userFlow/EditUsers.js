import { useState } from 'react';

import useForm from '../../hooks/useForm';
import { useUsers } from '../../hooks/swr-hooks';
import { headers } from '../../hooks/swr-switch';

import Selector from '../styles/Selector';
import EditUser from './EditUser';

export default function EditUsers({ currentUser }) {
  const { data, isLoading } = useUsers();

  const [savingStarted, setSavingStarted] = useState();
  const [successMessage, setSuccessMesssage] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const { values, handleChange } = useForm(callback);

  console.log(isLoading);

  function callback() {
    if (!savingStarted) {
      setSavingStarted(true);
      const url = `api/users/${currentUser.id}`;
      const options = {
        body: JSON.stringify({
          is_admin: values.admin,
        }),
        headers,
        method: 'PUT',
        credentials: 'include',
      };
      fetch(url, options)
        .then(async (res) => {
          const data = await res.json();
          if (!res.ok) {
            throw Error(data.message);
          } else {
            console.log(data);
            setSuccessMesssage('You did it!');
          }
        })
        .catch((err) => {
          setErrorMessage(err.message);
          console.log(err);
        });
    }
  }

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>Loading...</p>;
  const { users } = data;
  return (
    <>
        <Selector>
      <h2>Choose User</h2>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
      <select value={values.user} name='user' id='user' onChange={handleChange}>
        {users.map((user) => {
          return (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          );
        })}
      </select>
      </Selector>
      <EditUser id={values.user} />
    </>
  );
}
