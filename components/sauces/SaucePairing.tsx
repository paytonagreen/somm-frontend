import { useState } from 'react';
import { useSauces, useWines } from 'hooks/swr-hooks';

import { headers } from 'hooks/swr-switch';
import useForm from 'hooks/useForm';

import Form from '../reusable/Form';
import Loader from '../reusable/Loader';

export default function SaucePairing() {
  const { wineData } = useWines();
  const { sauceData } = useSauces();
  const [savingStarted, setSavingStarted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { values, handleChange, handleSubmit } = useForm(callback, {
    sauce_id: '',
    wine_id: '',
  }); 

  async function callback() {
    if (!savingStarted) {
      setSavingStarted(true);
      try {
        const url = `api/wines_sauces`;
        const options = {
          body: JSON.stringify({
            sauce_id: values.sauce_id,
            wine_id: values.wine_id,
          }),
          method: 'POST',
          headers,
        };
        const res = await fetch(url, options);
        const data = await res.json();
        if (!res.ok) {
          throw Error(data.message);
        } else {
          setSuccessMessage('Paired up!');
        }
      } catch (err) {
        setErrorMessage(err.message);
      }
    }
  }

  if (!sauceData || !wineData) return <Loader />;
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
