import { useState } from 'react';
import { mutate} from 'swr'
import useForm from 'hooks/useForm';
import { headers } from 'lib/utils';

import Form from '../reusable/Form';

export default function AddProtein() {
  const { values, handleChange, handleSubmit } = useForm(callback, {
    name: '',
  }); 
  const [savingStarted, setSavingStarted] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  function callback() {
    if (!savingStarted) {
      setSavingStarted(true);
      fetch(`api/proteins/`, {
        body: JSON.stringify({
          protein_name: values.name,
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
            mutate('api/proteins');
          }
        })
        .catch((err) => {
          setErrorMessage(err.message);
        });
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Add Protein</h2>
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
      <button type='submit'>
        Submit
      </button>
    </Form>
  );
}
