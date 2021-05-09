import { useState } from 'react';

import { useProteins, useWines } from 'hooks/swr-hooks';
import { headers } from 'hooks/swr-switch';
import useForm from 'hooks/useForm';

import Form from '../reusable/Form';
import Loader from '../reusable/Loader';

export default function Pairing() {
  const { wines, isLoading } = useWines();
  const { proteins } = useProteins();
  const [savingStarted, setSavingStarted] = useState(false);
  const [successMessage, setSuccessMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const { values, handleChange, handleSubmit } = useForm(callback, {
    wine_id: '',
    protein_id: '',
  });

  function callback() {
    if (!savingStarted) {
      setSavingStarted(true);
      const url = `api/wines_proteins`;
      const options = {
        body: JSON.stringify({
          protein_id: values.protein_id,
          wine_id: values.wine_id,
        }),
        method: 'POST',
        headers,
      };
      fetch(url, options)
        .then(async (res) => {
          const data = await res.json();
          if (!res.ok) {
            throw Error(data.message);
          } else {
            setSuccessMessage('Paired up!');
          }
        })
        .catch((err) => {
          setErrorMessage(err.message);
        });
    }
  }

  if (isLoading || !proteins) return <Loader />;
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
        {wines.map((wine) => {
          return (
            <option value={wine.id} key={wine.id}>
              {wine.wine_name}
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
        {proteins.map((protein) => {
          return (
            <option value={protein.id} key={protein.id}>
              {protein.protein_name}
            </option>
          );
        })}
      </select>
      <button type='submit'>Pair 'Em Up!</button>
    </Form>
  );
}
