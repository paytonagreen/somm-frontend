import { useState } from 'react';

import useForm from '../hooks/useForm';
import { api, headers } from '../hooks/swr-switch';

import Form from './reusable/Form';

export default function AddWine() {
  const [savingStarted, setSavingStarted] = useState(false);
  const [successMessage, setSuccessMessage] = useState();

  const { values, handleChange, handleSubmit } = useForm(callback, {
    name: '',
    description: '',
  });

  function callback() {
    if (!savingStarted) {
      try {
        setSavingStarted(true);
        fetch(`${api}/wines/`, {
          body: JSON.stringify({
            wine_name: values.name,
            wine_description: values.description,
          }),
          method: `POST`,
          headers,
        });
        setSuccessMessage('You did it!');
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <Form>
      <h2>Add Wine</h2>
      {successMessage && <p>{successMessage}</p>}
      <label htmlFor='name'>Name</label>
      <input
        id='name'
        name='name'
        type='text'
        value={values.name}
        onChange={(e) => handleChange(e)}
      />
      <label htmlFor='description'>Description</label>
      <textarea
        id='description'
        name='description'
        className='textbox'
        type='textarea'
        value={values.description}
        onChange={(e) => handleChange(e)}
      />
      <button type='submit' onClick={(e) => handleSubmit(e)}>
        Submit
      </button>
    </Form>
  );
}
