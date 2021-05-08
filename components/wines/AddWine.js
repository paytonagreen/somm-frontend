import { useState } from 'react';
import { mutate } from 'swr';

import useForm from '../../hooks/useForm';
import { headers } from '../../hooks/swr-switch';

import Form from '../reusable/Form';

export default function AddWine() {
  const [savingStarted, setSavingStarted] = useState(false);
  const [successMessage, setSuccessMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const { values, handleChange, handleSubmit } = useForm(callback, {
    name: '',
    description: '',
  });

  function callback() {
    if (!savingStarted) {
      setSavingStarted(true);
      fetch(`api/wines/`, {
        body: JSON.stringify({
          wine_name: values.name,
          wine_description: values.description,
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
            mutate('api/wines');
          }
        })
        .catch((err) => {
          setErrorMessage(err.message);
        });
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Add Wine</h2>
      {!errorMessage && successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
      <label htmlFor='name'>Name</label>
      <input
        id='name'
        name='name'
        type='text'
        value={values.name}
        onChange={handleChange}
      />
      <label htmlFor='description'>Description</label>
      <textarea
        id='description'
        name='description'
        className='textbox'
        type='textarea'
        value={values.description}
        onChange={handleChange}
      />
      <button aria-label='submit' type='submit'>
        Submit
      </button>
    </Form>
  );
}
