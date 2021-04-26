import { useState } from 'react';

import useForm from '../../hooks/useForm';
import { headers } from '../../hooks/swr-switch';

import Form from '../reusable/Form';

export default function EditUser({ currentUser }) {
  const [savingStarted, setSavingStarted] = useState();
  const [successMessage, setSuccessMesssage] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const { values, handleChange, handleSubmit } = useForm(callback);

  function callback() {
    if (!savingStarted) {
      setSavingStarted(true)
      const url = `api/users/${currentUser.id}`;
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
            console.log(data);
            setSuccessMesssage('You did it!');
          }
        })
        .catch((err) => {
          setErrorMessage(err.message);
          console.log(err);
        });
    }
  }

  if (!currentUser) return <p>Loading...</p>;
  else if (currentUser)
    return (
      <Form onSubmit={handleSubmit}>
        <h2>Edit User</h2>
        {successMessage && <p>{successMessage}</p>}
        {errorMessage && <p>{errorMessage}</p>}
        <select
          name='admin'
          id='admin'
          onChange={handleChange}
          defaultValue={currentUser.is_admin}
          value={values.admin}
        >
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        <button type='submit'>Submit</button>
      </Form>
    );
}
