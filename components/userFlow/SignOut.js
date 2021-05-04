import { useState } from 'react';
import { useRouter } from 'next/router';

import { headers } from '../../hooks/swr-switch';
import useForm from '../../hooks/useForm';

import DeleteButton from '../styles/DeleteButton';
import { response } from 'msw';

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
        if (!res.ok) {
          console.log(error);
          const message = `An error has occured: ${res.status}`
          throw new Error(message)
        }
        const data = await res.json();
        setCurrentUser({});
        setSignOutMessage('Thanks! See ya later!')
      } catch (err) {
        console.log(err);
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
