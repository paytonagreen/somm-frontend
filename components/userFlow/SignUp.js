import { useState } from 'react';

import useForm from '../../hooks/useForm';
import { headers } from '../../hooks/swr-switch';

import Form from '../reusable/Form';

export default function SignUp() {
  const [savingStarted, setSavingStarted] = useState(false);
  const [successMessage, setSuccessMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const { values, handleChange, handleSubmit } = useForm(callback, {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

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
          console.log(data);
          if (!res.ok) {
            throw Error(data.message);
          } else {
            setSuccessMessage('You did it!');
          }
        })
        .catch((err) => {
          setErrorMessage(err.message);
        });
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
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
