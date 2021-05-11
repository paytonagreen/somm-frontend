import { useEffect } from 'react';

import { headers } from './swr-switch';

function useUser(setCurrentUser) {

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
        setCurrentUser(data.user);
      }
    })
    .catch((err) => {
    });
}, [])
}

export default useUser;
