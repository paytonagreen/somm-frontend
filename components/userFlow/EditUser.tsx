import { useEffect, useState } from 'react';

import { useOneUser } from 'hooks/swr-hooks';
import useForm from 'hooks/useForm';
import { headers } from 'lib/utils';

import Form from '../reusable/Form';
import Loader from '../reusable/Loader';
import { FetchOptions } from 'types';

interface Props {
  id: number;
}

const EditUser: React.FC<Props> = ({ id }) => {
  const { data } = useOneUser(id);

  const [savingStarted, setSavingStarted] = useState(false);
  const [successMessage, setSuccessMesssage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { values, setValues, handleChange, handleSubmit } = useForm(callback, {
    admin: '',
  });

  useEffect(() => {
    if (data) {
      setValues({
        admin: data.user.is_admin.toString(),
      });
    }
  }, [data]);

  function callback() {
    if (!savingStarted) {
      setSavingStarted(true);
      const url = `api/users/${id}`;
      const options: FetchOptions = {
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
  if (!data) return <Loader />;
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
        value={values.admin}
      >
        <option value='true'>Yes</option>
        <option value='false'>No</option>
      </select>
      <button type='submit'>Submit</button>
    </Form>
  );
};

export default EditUser;
