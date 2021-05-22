import { useState } from 'react';

import useForm from 'hooks/useForm';

import Form from '../reusable/Form';
import { headers, myFetch } from 'lib/utils';

const RequestReset = () => {
  const [savingStarted, setSavingStarted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { values, handleChange, handleSubmit } = useForm(callback, {
    email: '',
  });

  async function callback() {
    if (!savingStarted) {
      setSavingStarted(true);
      const url = 'api/password/forgot';
      const options = {
        headers,
        method: 'POST',
        body: JSON.stringify({
          email: values.email,
        }),
      };
      const mutateString = '';
      const successString = 'Reset Email Sent!';
      await myFetch(
        url,
        options,
        mutateString,
        setSuccessMessage,
        setErrorMessage,
        successString
      );
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
        {successMessage && <p>{successMessage}</p>}
        {errorMessage && <p>{errorMessage}</p>}
      <h2>Forgot Your Password?</h2>
      <label htmlFor='email'>Email</label>
      <input
        type='email'
        id='email'
        name='email'
        value={values.email}
        onChange={handleChange}
      />
      <button>Request Reset</button>
    </Form>
  );
};

export default RequestReset;
