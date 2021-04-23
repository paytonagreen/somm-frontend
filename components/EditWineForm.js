import { useState } from 'react';

import useForm from '../hooks/useForm';
import { api, headers } from '../hooks/swr-switch';

import Form from './reusable/Form';
import DeleteWine from './DeleteWine';
import ButtonRow from './styles/ButtonRow';

export default function EditWineForm({ data, id }) {
  const [savingStarted, setSavingStarted] = useState(false);
  const [successMessage, setSuccessMessage] = useState();

  const { values, handleChange, handleSubmit } = useForm(callback, {
    name: data.wine_name,
    description: data.wine_description,
  });

  function callback() {
    if (!savingStarted) {
      try {
        setSavingStarted(true);
        fetch(`${api}/wines/${id}`, {
          body: JSON.stringify({
            wine_name: values.name,
            wine_description: values.description,
          }),
          method: `PUT`,
          headers,
        });
        setSuccessMessage('Saved successfully.');
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Edit Wine</h2>
      {successMessage && <p>{successMessage}</p>}
      <label htmlFor='name'>Name</label>
      <input
        name='name'
        type='text'
        value={values.name}
        onChange={handleChange}
      />
      <label htmlFor='description'>Description</label>
      <textarea
        name='description'
        className='textbox'
        type='textarea'
        value={values.description}
        onChange={handleChange}
      />
      <ButtonRow>
        <button type='submit'>Submit</button>
        <DeleteWine id={id} />
      </ButtonRow>
    </Form>
  );
}
