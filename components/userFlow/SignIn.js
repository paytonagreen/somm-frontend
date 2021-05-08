import { useState } from 'react';
import Router from 'next/router'

import useForm from 'hooks/useForm';
import { headers } from 'hooks/swr-switch';

import Form from '../reusable/Form';
import { mutate } from 'swr';

export default function SignIn() {

  const [savingStarted, setSavingStarted] = useState(false);
  const [successMessage, setSuccessMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const { values, handleChange, handleSubmit } = useForm(callback, {
    username: '',
    password: '',
  });

  function callback() {
    if (!savingStarted) {
      setSavingStarted(true);
      fetch(`/api/login/`, {
        body: JSON.stringify({
          user: {
            username: values.username,
            password: values.password,
          },
        }),
        method: `POST`,
        credentials: 'include',
        headers,
        mode: 'cors',
      })
        .then(async (res) => {
          const data = await res.json();
          if (!res.ok) {
            throw Error(data.message);
          } else {
            await data;
            mutate('api/logged_in');
            setSuccessMessage('Signing in...');
            Router.push('/')
          }
        })
        .catch((err) => {
          setErrorMessage(err.message);
        });
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Sign In</h2>
      {!errorMessage && successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
      <label htmlFor='username'>Username</label>
      <input
        id='username'
        name='username'
        type='text'
        value={values.username}
        onChange={handleChange}
      />
      <label htmlFor='password'>Password</label>
      <input
        id='password'
        name='password'
        type='password'
        value={values.password}
        onChange={handleChange}
      />

      <button aria-label='submit' type='submit'>
        Submit
      </button>
    </Form>
  );
}
