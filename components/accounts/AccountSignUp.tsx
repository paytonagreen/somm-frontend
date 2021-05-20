import { useState } from 'react';
import Link from 'next/link';

import useForm from 'hooks/useForm';
import { headers, myFetch } from 'lib/utils';

import Form from '../reusable/Form';
import { FetchOptions } from 'types';

export default function AccountSignUp() {
  const [savingStarted, setSavingStarted] = useState(false);
  const [successMessage, setSuccessMessage] = useState<JSX.Element | undefined>();
  const [errorMessage, setErrorMessage] = useState('');

  const { values, handleChange, handleSubmit } = useForm(callback, {
    accountName: '',
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
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
      const url = 'api/accounts';
      const options: FetchOptions = {
        body: JSON.stringify({
          name: values.accountName,
          username: values.username,
          email: values.email,
          password: values.password,
          password_confirmation: values.password_confirmation,
        }),
        method: `POST`,
        headers,
      };
      const mutateString = 'api/users';
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
      <h2>Account Sign Up</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <label htmlFor='accountName'>Account Name</label>
      <input
        id='accountName'
        name='accountName'
        type='text'
        value={values.accountName}
        onChange={handleChange}
      />
      <label htmlFor='username'>Admin Username</label>
      <input
        id='username'
        name='username'
        type='text'
        value={values.username}
        onChange={handleChange}
      />
      <label htmlFor='email'>Admin Email</label>
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

      <button aria-label='submit' type='submit'>
        Submit
      </button>
    </Form>
  );
}
