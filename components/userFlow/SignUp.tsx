import { useState } from 'react';
import Link from 'next/link'

import useForm from 'hooks/useForm';
import { headers, myFetch } from 'lib/utils';

import Form from '../reusable/Form';
import { FetchOptions } from 'types';

export default function SignUp() {
  const [savingStarted, setSavingStarted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { values, handleChange, handleSubmit } = useForm(callback, {
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    account_id: 0,
  });

  const signedUp = (
    <Form>
      Thank you for signing up!
      <Link href='/'>
        <a>Let's get pairing!</a>
      </Link>
    </Form>
  );

  async function callback() {
    if (!savingStarted) {
      setSavingStarted(true);
      const url = 'api/users';
      const options: FetchOptions = {
        body: JSON.stringify({
          user: {
            username: values.username,
            email: values.email,
            password: values.password,
            password_confirmation: values.password_confirmation,
            account_id: values.account_id
          },
        }),
        method: `POST`,
        headers,
      };
      const mutateString = 'api/users';
      console.log(options)
      await myFetch(
        url,
        options,
        mutateString,
        setSuccessMessage,
        setErrorMessage,
        signedUp
      );
    }
  }

  if (successMessage) return <>{successMessage}</>;
  return (
    <Form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <label htmlFor='username'>Username</label>
      <input
        id='username'
        name='username'
        type='text'
        value={values.username}
        onChange={handleChange}
      />
      <label htmlFor='email'>Email</label>
      <input
        id='email'
        name='email'
        type='email'
        value={values.email}
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
      <label htmlFor='password-confirmation'>Confirm Password</label>
      <input
        id='password_confirmation'
        name='password_confirmation'
        type='password'
        value={values.password_confirmation}
        onChange={handleChange}
      />
      <label htmlFor='account_id'>Account Number</label>
      <input
        id='account_id'
        name='account_id'
        type='number'
        value={values.account_id}
        onChange={handleChange}
      />

      <button aria-label='submit' type='submit'>
        Submit
      </button>
    </Form>
  );
}
