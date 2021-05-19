import { useState } from 'react';

import useForm from 'hooks/useForm';
import { headers, myFetch } from 'lib/utils';
import { FetchOptions } from 'types';

import Form from '../reusable/Form';

export default function AddWine() {
  const [savingStarted, setSavingStarted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { values, handleChange, handleSubmit } = useForm(callback, {
    name: '',
    description: '',
  });

  async function callback() {
    if (!savingStarted) {
      setSavingStarted(true);
      const url = 'api/wines';
      const options: FetchOptions = {
        body: JSON.stringify({
          name: values.name,
          wine_description: values.description,
        }),
        method: `POST`,
        headers,
      };
      const mutateString = `api/wines?page=1&per_page=8`;
      await myFetch(
        url,
        options,
        mutateString,
        setSuccessMessage,
        setErrorMessage
      );
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
        value={values.description}
        onChange={handleChange}
      />
      <button aria-label='submit' type='submit'>
        Submit
      </button>
    </Form>
  );
}
