import { useState } from 'react';

import { useProteins, useWines } from 'hooks/swr-hooks';
import { headers, myFetch } from 'lib/utils';
import useForm from 'hooks/useForm';

import Form from '../reusable/Form';
import Loader from '../reusable/Loader';

export default function Pairing() {
  const { wineData } = useWines();
  const { proteinData } = useProteins();
  const [savingStarted, setSavingStarted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { values, handleChange, handleSubmit } = useForm(callback, {
    wine_id: '',
    protein_id: '',
  });

  async function callback() {
    if (!savingStarted) {
      setSavingStarted(true);
      const url = `api/wines_proteins`;
      const options = {
        body: JSON.stringify(values),
        method: 'POST',
        headers,
      };
      const mutateString = 'api/wines_proteins';
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

  if (!wineData || !proteinData) return <Loader />;
  return (
    <Form onSubmit={handleSubmit}>
      <h2>Pairing!</h2>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
      <label htmlFor='wine_id' />
      <select
        aria-label='wine_id'
        id='wine_id'
        value={values.wine_id}
        name='wine_id'
        onChange={handleChange}
      >
        <option value='' disabled>
          Select A Wine
        </option>
        {wineData.wines.map((wine) => {
          return (
            <option value={wine.id} key={wine.id}>
              {wine.name}
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
