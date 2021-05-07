import { useState } from 'react';

import { useOneUser } from '../../hooks/swr-hooks';
import useForm from '../../hooks/useForm';
import { headers } from '../../hooks/swr-switch';

import Form from '../reusable/Form';

export default function EditUser({ id }) {
  const { data, isLoading } = useOneUser(id);

  const [savingStarted, setSavingStarted] = useState();
  const [successMessage, setSuccessMesssage] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const { values, handleChange, handleSubmit } = useForm(callback);

  function callback() {
    if (!savingStarted) {
      setSavingStarted(true);
      const url = `api/users/${id}`;
      const options = {
        body: JSON.stringify({
          is_admin: values.admin,
        }),
        headers,
        method: 'PUT',
        credentials: 'include',
      };
      fetch(url, options)
        .then(async (res) => {
          const data = await res.json();
          if (!res.ok) {
            throw Error(data.message);
          } else {
            setSuccessMesssage('You did it!');
          }
        })
        .catch((err) => {
          setErrorMessage(err.message);
        });
    }
  }

  if (!id) return <p></p>;
  if (!data) return <p>Loading...</p>;
  const { user } = data;
  return (
    <Form onSubmit={handleSubmit}>
      <h2>Is Admin?</h2>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
      <select
        aria-label='admin'
        name='admin'
        id='admin'
        onChange={handleChange}
        defaultValue={user.is_admin}
        value={values.admin}
      >
        <option value={true}>Yes</option>
        <option value={false}>No</option>
      </select>
      <button type='submit'>Submit</button>
    </Form>
  );
}
