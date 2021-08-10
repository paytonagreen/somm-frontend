import { useState } from 'react';

import { useProteins, useGrapes } from 'hooks/swr-hooks';
import { headers, myFetch } from 'lib/utils';
import useForm from 'hooks/useForm';

import Form from '../reusable/Form';
import Loader from '../reusable/Loader';

export default function Pairing() {
  const { grapeData } = useGrapes();
  const { proteinData } = useProteins();
  const [savingStarted, setSavingStarted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { values, handleChange, handleSubmit } = useForm(callback, {
    protein_id: '',
    grape_id: '',
  });

  async function callback() {
    if (!savingStarted) {
      setSavingStarted(true);
      const url = `api/proteins_grapes`;
      const options = {
        body: JSON.stringify(values),
        method: 'POST',
        headers,
      };
      const mutateString = 'api/proteins_grapes';
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

  if (!grapeData || !proteinData) return <Loader />;
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
          Select A Grape
        </option>
        {grapeData.grapes.map((grape) => {
          return (
            <option value={grape.id} key={grape.id}>
              {grape.name}
            </option>
          );
        })}
      </select>
      <label htmlFor='protein_id' />
      <select
        aria-label='protein_id'
        id='protein_id'
        value={values.protein_id}
        name='protein_id'
        onChange={handleChange}
      >
        <option value='' disabled>
          Select A Protein
        </option>
        {proteinData.proteins.map((protein) => {
          return (
            <option value={protein.id} key={protein.id}>
              {protein.name}
            </option>
          );
        })}
      </select>
      <button type='submit'>Pair 'Em Up!</button>
    </Form>
  );
}
