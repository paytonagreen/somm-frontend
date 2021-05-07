import { useState } from 'react';
import {mutate} from 'swr';

import { headers } from '../../hooks/swr-switch';
import useForm from '../../hooks/useForm';

import DeleteButton from '../styles/DeleteButton';

export default function SignOut({setCurrentUser}) {
  const [isSubmitting, setIsSubmitting] = useState();
  const [signOutMessage, setSignOutMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const { handleSubmit } = useForm(callback);

  async function callback() {
    if (!isSubmitting) {
      setIsSubmitting(true)
      try {
        const url = 'api/logout'
        const options = {
          method: 'POST',
          credentials: 'include',
          headers,
        }
        const res = await fetch (url,options);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message)
        }
        setCurrentUser({});
        setSignOutMessage('Thanks! See ya later!')
      } catch (err) {
        setErrorMessage(err.message);
      }  
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {signOutMessage && <p>{signOutMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
      {!signOutMessage && !errorMessage && <DeleteButton>Sign Out</DeleteButton>}
    </form>
  );
}
