import { useState } from 'react';

import useForm from 'hooks/useForm';
import { headers } from 'hooks/swr-switch';

import Form from './Form';

interface BasicBody {
  name: string;
}

interface Props {
  destination: string;
  name: string;
  body: BodyInit;
}

const AddThing: React.FC<Props> = ({ destination, name, body }) => {
  const [savingStarted, setSavingStarted] = useState(false);
  const { values, handleChange, handleSubmit } = useForm(callback, {
    name: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function callback() {
    if (!savingStarted) {
      setSavingStarted(true);
      fetch(`api/${destination}/`, {
        body,
        method: `POST`,
        headers,
      })
        .then(async (res) => {
          const data = await res.json();
          if (!res.ok) {
            throw Error(data.message);
          } else {
            setSuccessMessage('You did it!');
          }
        })
        .catch((err) => {
          setErrorMessage(err.message);
        });
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h2>{`Add ${name}`}</h2>
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
      <button type='submit'>Submit</button>
    </Form>
  );
};
