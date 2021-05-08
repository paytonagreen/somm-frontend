import { useState } from 'react';
import { mutate } from 'swr';

import useForm from 'hooks/useForm';
import { headers } from 'hooks/swr-switch';

import Form from '../reusable/Form';

export default function AddSauce() {
  const [savingStarted, setSavingStarted] = useState(false);
  const { values, handleChange, handleSubmit } = useForm(callback, {
    name: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function callback() {
    if (!savingStarted) {
      setSavingStarted(true);
      fetch(`api/sauces/`, {
        body: JSON.stringify({
          sauce_name: values.name,
        }),
        method: `POST`,
        headers,
      })
        .then(async (res) => {
          const data = await res.json();
          if (!res.ok) {
            throw Error(data.message);
          } else {
            setSuccessMessage('You did it!');
            mutate('api/sauces')
          }
        })
        .catch((err) => {
          setErrorMessage(err.message);
        });
    }
  }

  return (
    <Form>
      <h2>Add Sauce</h2>
      {successMessage && <p>{successMessage}</p>}
      {!successMessage && errorMessage && <p>{errorMessage}</p>}
      <label htmlFor='name'>
        <input
          aria-label='name'
          name='name'
          type='text'
          value={values.name}
          onChange={(e) => handleChange(e)}
        />
      </label>
      <button type='submit' onClick={(e) => handleSubmit(e)}>
        Submit
      </button>
    </Form>
  );
}
