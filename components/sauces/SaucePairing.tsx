import { useState } from 'react';
import { useSauces, useGrapes } from 'hooks/swr-hooks';

import { headers, myFetch } from 'lib/utils';
import useForm from 'hooks/useForm';

import Form from '../reusable/Form';
import Loader from '../reusable/Loader';

export default function SaucePairing() {
  const { grapeData } = useGrapes();
  const { sauceData } = useSauces();
  const [savingStarted, setSavingStarted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { values, handleChange, handleSubmit } = useForm(callback, {
    sauce_id: '',
    grape_id: '',
  });

  async function callback() {
    if (!savingStarted) {
      setSavingStarted(true);
      const url = `api/sauces_grapes`;
      const options = {
        body: JSON.stringify({
          sauce_id: values.sauce_id,
          grape_id: values.grape_id,
        }),
        method: 'POST',
        headers,
      };
      const mutateString = 'api/sauces_grapes';
      const successMessage = 'Paired up!';
      await myFetch(
        url,
        options,
        mutateString,
        setSuccessMessage,
        setErrorMessage,
        successMessage
      );
    }
  }

  if (!sauceData || !grapeData) return <Loader />;
  return (
    <Form onSubmit={handleSubmit}>
      <h2>Pairing!</h2>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
      <label htmlFor='grape_id' />
      <select
        aria-label='grape_id'
        id='grape_id'
        value={values.grape_id}
        name='grape_id'
        onChange={handleChange}
      >
        <option value='' disabled>
          Select A Wine
        </option>
        {grapeData.grapes.map((grape) => {
          return (
            <option value={grape.id} key={grape.id}>
              {grape.name}
            </option>
          );
        })}
      </select>
      <label htmlFor='sauce_id' />
      <select
        aria-label='sauce_id'
        id='sauce_id'
        value={values.sauce_id}
        name='sauce_id'
        onChange={handleChange}
      >
        <option value='' disabled>
          Select A Sauce
        </option>
        {sauceData.sauces.map((sauce) => {
          return (
            <option value={sauce.id} key={sauce.id}>
              {sauce.name}
            </option>
          );
        })}
      </select>
      <button type='submit'>Pair 'Em Up!</button>
    </Form>
  );
}
