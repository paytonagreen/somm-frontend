import { useState } from 'react';
import { JsxElement } from 'typescript';

import useForm from 'hooks/useForm';
import { headers } from 'lib/utils';
import { SignInValues, User } from 'types';

import Form from '../reusable/Form';

interface Props {
  currentUser: User;
  children: JsxElement;
}

const PleaseSignIn: React.FC<Props> = ({ currentUser, children }) => {
  const [savingStarted, setSavingStarted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { values, handleChange, handleSubmit } = useForm<SignInValues>(callback, {
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
            localStorage.setItem('user', JSON.stringify(data.user));
            setSuccessMessage('You did it!');
          }
        })
        .catch((err) => {
          setErrorMessage(err.message);
        });
    }
  }
  if (currentUser && currentUser.is_admin) return <>{children}</>;
  return (
    <Form onSubmit={handleSubmit}>
      <h2>Please Sign In To View This Content</h2>
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
