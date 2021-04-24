import { useState } from 'react';

import useForm from '../hooks/useForm';
import { api, headers } from '../hooks/swr-switch';

import Form from './reusable/Form';
import DeleteWine from './DeleteWine';
import ButtonRow from './styles/ButtonRow';

export default function EditWineForm({ data, id }) {
  const [savingStarted, setSavingStarted] = useState(false);
  const [successMessage, setSuccessMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const { values, handleChange, handleSubmit } = useForm(callback, {
    name: data.wine_name,
    description: data.wine_description,
  });

  function callback() {
    if (!savingStarted) {
      setSavingStarted(true);
      fetch(`${api}/wines/${id}`, {
        body: JSON.stringify({
          wine_name: values.name,
          wine_description: values.description,
        }),
        method: `PUT`,
        headers,
      })
        .then(async (res) => {
          const data = await res.json();
          if (!res.ok) {
            throw Error(data.message);
          } else {
            setSuccessMessage('Saved successfully.');
          }
        })
        .catch((err) => {
          setErrorMessage(err.message);
        });
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Edit Wine</h2>
      {successMessage && <p>{successMessage}</p>}
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
      <ButtonRow>
        <button type='submit'>Submit</button>
        <DeleteWine id={id} />
      </ButtonRow>
    </Form>
  );
}
