import { useState } from 'react';
import { useRouter } from 'next/router';

import { headers } from '../../hooks/swr-switch';
import useForm from '../../hooks/useForm';

import DeleteButton from '../styles/DeleteButton';

export default function SignOut() {
  const router = useRouter();
  const [signOutMessage, setSignOutMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const { handleSubmit } = useForm(callback);

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
          router.reload();
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
