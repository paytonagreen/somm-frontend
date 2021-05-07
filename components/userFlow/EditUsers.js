import useForm from '../../hooks/useForm';
import { useUsers } from '../../hooks/swr-hooks';

import Selector from '../styles/Selector';
import EditUser from './EditUser';

export default function EditUsers() {
  const { data } = useUsers();
  const { values, handleChange } = useForm(() => {}, {
    user: '',
  });

  if (!data) return <p>Loading...</p>;
  const { users } = data;
  return (
    <>
      <Selector>
        <h2>Choose User</h2>
        <select
          value={values.user}
          aria-label='user'
          name='user'
          id='user'
          onChange={handleChange}
        >
          <option key={12345} value="" disabled>Select A User</option>
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
