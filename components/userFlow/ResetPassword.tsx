import useForm from 'hooks/useForm';
import { headers, myFetch } from 'lib/utils';
import { useEffect, useState } from 'react';
import Form from '../reusable/Form';

interface ResetPasswordProps {
  token: string;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ token }) => {
  const [savingStarted, setSavingStarted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordValidationError, setPasswordValidationError] = useState('');

  const { values, handleSubmit, handleChange } = useForm(callback, {
    password: '',
    password_confirmation: '',
  });

  useEffect(() => {
    if (values.password && values.password_confirmation) {
      if (values.password !== values.password_confirmation) {
        setPasswordValidationError('Both password fields must match');
      } else {
        setPasswordValidationError('');
      }
    }
  }, [values.password, values.password_confirmation]);

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
      {passwordValidationError && <p>{passwordValidationError}</p>}
      <label htmlFor='password'>New Password</label>
      <input
        type='password'
        name='password'
        id='password'
        onChange={handleChange}
      />
      <label htmlFor='password_confirmation'>Confirm Password</label>
      <input
        type='password'
        name='password_confirmation'
        id='password_confirmation'
        onChange={handleChange}
      />
      <button disabled={passwordValidationError ? true : false}>Reset</button>
    </Form>
  );
};

export default ResetPassword;
