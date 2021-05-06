import useForm from '../../hooks/useForm';
import { useUsers } from '../../hooks/swr-hooks';

import Selector from '../styles/Selector';
import EditUser from './EditUser';

export default function EditUsers() {
  const { data, isLoading } = useUsers();
  const { values, handleChange } = useForm();

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>Loading...</p>;
  const { users } = data;
  return (
    <>
      <Selector>
        <h2>Choose User</h2>
        <select
          value={values.user}
          name='user'
          id='user'
          onChange={handleChange}
        >
          {users.map((user) => {
            return (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            );
          })}
        </select>
      </Selector>
      <EditUser id={values.user} />
    </>
  );
}
