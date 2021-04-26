import { useState } from 'react';
import { useSauces, useWines } from '../../hooks/swr-hooks';

import { api, headers } from '../../hooks/swr-switch';
import useForm from '../../hooks/useForm';

import Form from '../reusable/Form';

export default function SaucePairing() {
  const { wines, isLoading } = useWines();
  const { sauces } = useSauces();
  const [savingStarted, setSavingStarted] = useState(false);
  const [successMessage, setSuccessMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const { values, handleChange, handleSubmit } = useForm(callback);

  function callback() {
    if (!savingStarted) {
      setSavingStarted(true);
      const url = `${api}/wines_sauces`;
      const options = {
        body: JSON.stringify({
          sauce_id: values.sauce_id,
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

  if (isLoading || !sauces) return <p>'Loading...'</p>;
  if (wines && sauces);
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
        {wines.map((wine) => {
          return (
            <option value={wine.id} key={wine.id}>
              {wine.wine_name}
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
        <option value='' disabled selected >Select A Sauce</option>
        {sauces.map((sauce) => {
          return (
            <option value={sauce.id} key={sauce.id}>
              {sauce.sauce_name}
            </option>
          );
        })}
      </select>
      <button type='submit'>Pair 'Em Up!</button>
    </Form>
  );
}
