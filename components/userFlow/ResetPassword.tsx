import useForm from 'hooks/useForm';
import { headers, myFetch } from 'lib/utils';
import { useState } from 'react';
import Form from '../reusable/Form';

interface ResetPasswordProps {
  token: string;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ token }) => {
  const [savingStarted, setSavingStarted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { values, handleSubmit, handleChange } = useForm(callback, {
    password: '',
  });

  async function callback() {
    if (!savingStarted) {
      setSavingStarted(true);
      const url = 'api/password/reset';
      const options = {
        headers,
        method: 'POST',
        body: JSON.stringify({
          password: values.password,
          token,
        }),
      };
      const mutateString = '';
      const successString = 'Password Reset!';
      await myFetch(
        url,
        options,
        mutateString,
        setSuccessMessage,
        setErrorMessage,
        successString
      );
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Reset Password</h2>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
      <label htmlFor='password'>New Password</label>
      <input
        type='password'
        name='password'
        id='password'
        onChange={handleChange}
      />
      <button>Reset</button>
    </Form>
  );
};

export default ResetPassword;
