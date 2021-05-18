import { useState } from 'react';
import {mutate} from 'swr';

import { headers } from 'lib/utils';
import useForm from 'hooks/useForm';

import DeleteButton from '../styles/DeleteButton';
import { FetchOptions } from 'types';

export default function SignOut() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { handleSubmit } = useForm(callback);

  async function callback() {
    if (!isSubmitting) {
      setIsSubmitting(true)
      try {
        const url = 'api/logout'
        const options: FetchOptions = {
          method: 'POST',
          credentials: 'include',
          headers,
        }
        const res = await fetch (url, options);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message)
        }
        mutate('api/logged_in')
      } catch (err) {
        setErrorMessage(err.message);
      }  
    }
  }

  return (
    <form onSubmit={handleSubmit} className="signOut">
      {errorMessage && <p>{errorMessage}</p>}
      {!errorMessage && <DeleteButton>Sign Out</DeleteButton>}
    </form>
  );
}
