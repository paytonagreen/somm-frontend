import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import useForm from '../../hooks/useForm';
import { headers } from '../../hooks/swr-switch';

import Form from '../reusable/Form';

export default function SignUp({ setCurrentUser }) {
  const router = useRouter();

  const [savingStarted, setSavingStarted] = useState(false);
  const [successMessage, setSuccessMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const { values, handleChange, handleSubmit } = useForm(callback, {
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

  function callback() {
    if (!savingStarted) {
      setSavingStarted(true);
      fetch(`api/users/`, {
        body: JSON.stringify({
          user: {
            username: values.username,
            email: values.email,
            password: values.password,
            password_confirmation: values.password_confirmation,
          },
        }),
        method: `POST`,
        headers,
      })
        .then(async (res) => {
          const data = await res.json();
          if (!res.ok) {
            throw Error(data.message);
          } else {
            setCurrentUser(data.user);
            setSuccessMessage(signedUp);
          }
        })
        .catch((err) => {
          setErrorMessage(err.message);
        });
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

      <button aria-label='submit' type='submit'>
        Submit
      </button>
    </Form>
  );
}
