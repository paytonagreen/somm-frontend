import { ChangeEventHandler, useState } from 'react';

import { useUsers } from 'hooks/swr-hooks';

import Selector from '../styles/Selector';
import EditUser from './EditUser';
import Loader from '../reusable/Loader';

export default function EditUsers() {
  const { data } = useUsers();
  const [selectedUser, setSelectedUser] = useState(0);

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    e.persist();
    const { value } = e.target;
    setSelectedUser(parseInt(value));
  };

  if (!data) return <Loader />;
  const { users } = data;
  return (
    <>
      <Selector>
        <h2>Choose User</h2>
        <select
          value={selectedUser}
          aria-label='user'
          name='user'
          id='user'
          onChange={handleChange}
        >
          <option key={12345} value={0} disabled>
            Select A User
          </option>
          {users.map((user) => {
            return (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            );
          })}
        </select>
      </Selector>
      {selectedUser !== 0 && <EditUser id={selectedUser} />}
    </>
  );
}
