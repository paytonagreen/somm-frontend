import { useState } from 'react';

import { api, headers } from '../../hooks/swr-switch';
import useForm from '../../hooks/useForm';

import DeleteButton from '../styles/DeleteButton';

export default function SignOut() {
  const [signOutMessage, setSignOutMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const {handleSubmit} = useForm(callback)

  function callback() {
    fetch(`api/logout`, {
      method: `POST`,
      credentials: 'include',
      headers,
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw Error(data.message);
        } else {
          setSignOutMessage(`You're signed out!`);
        }
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
    {signOutMessage && <p>{signOutMessage}</p>}
    {errorMessage && <p>{errorMessage}</p>}
      <DeleteButton>Sign Out</DeleteButton>
    </form>
  );
}
