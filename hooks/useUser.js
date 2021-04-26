import { useEffect } from 'react';

import { headers } from './swr-switch';

function useUser(setIsAdmin, setCurrentUser) {

useEffect(() => {
  const url = `api/logged_in`;
  const options = {
    method: 'GET',
    headers,
    credentials: 'include',
  };
  fetch(url, options)
    .then(async (res) => {
      const data = await res.json();
      if (!res.ok) {
        throw Error(data.message);
      } else if (data && res.ok) {
        console.log(data);
        setIsAdmin(data.user.is_admin);
        setCurrentUser(data.user);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}, [])
}

export default useUser;