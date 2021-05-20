import { useState } from 'react';

import useForm from 'hooks/useForm';
import { headers, myFetch, sentenceCase } from 'lib/utils';

import Form from './Form';
import { FetchOptions } from 'types';

interface AddProps {
  name: string;
}

const AddThing: React.FC<AddProps> = ({ name }) => {
  const [savingStarted, setSavingStarted] = useState(false);
  const { values, handleChange, handleSubmit } = useForm(callback, {
    name: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  async function callback() {
    if (!savingStarted) {
      setSavingStarted(true);
      const url = `api/${name}s`;
      const options: FetchOptions = {
        body: JSON.stringify(values),
        method: 'POST',
        headers,
      };
      const mutateString = `api/${name}s?page=1&per_page=8`
      await myFetch(url, options, mutateString, setSuccessMessage, setErrorMessage )
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h2>{`Add ${sentenceCase(name)}`}</h2>
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

export default AddThing;
