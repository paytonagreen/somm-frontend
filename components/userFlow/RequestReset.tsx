import useForm from 'hooks/useForm';
import Form from '../reusable/Form';

const RequestReset = () => {
  const { values, handleChange, handleSubmit } = useForm(() => {}, {
    email: '',
  });
  return (
    <Form onSubmit={handleSubmit}>
      <h2>Forgot Your Password?</h2>
      <label htmlFor='Email'>Email</label>
      <input
        type='email'
        id='email'
        name='email'
        value={values.email}
        onChange={handleChange}
      />
      <button>Request Reset</button>
    </Form>
  );
};

export default RequestReset;
