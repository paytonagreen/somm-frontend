import { useState } from 'react';

import useForm from 'hooks/useForm';
import { headers } from 'hooks/swr-switch';

import Form from '../reusable/Form';
import DeleteWine from './DeleteWine';
import ButtonRow from '../styles/ButtonRow';

export default function EditWineForm({ data, id }) {
  const [savingStarted, setSavingStarted] = useState(false);
  const [successMessage, setSuccessMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [deleteMessage, setDeleteMessage] = useState();

  const { values, handleChange, handleSubmit } = useForm(callback, {
    name: data.wine_name,
    description: data.wine_description,
  });

  async function callback() {
    if (!savingStarted) {
      setSavingStarted(true);
      try {
        const url = `api/wines/${id}`;
        const options = {
          body: JSON.stringify({
            wine_name: values.name,
            wine_description: values.description,
          }),
          method: `PUT`,
          headers,
        };
        const res = await fetch(url, options);
        const data = await res.json();
        if (!res.ok) {
          throw Error(data.message);
        } else {
          setSuccessMessage('Saved successfully.');
        }
      } catch (err) {
        setErrorMessage(err.message);
      }
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Edit Wine</h2>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
      {deleteMessage && <p>{deleteMessage}</p>}
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
      <ButtonRow>
        <button type='submit'>Submit</button>
        <DeleteWine
          setDeleteMessage={setDeleteMessage}
          setErrorMessage={setErrorMessage}
          id={id}
        />
      </ButtonRow>
    </Form>
  );
}
