import { usePaginatedAccountWines } from 'hooks/swr-hooks';
import { headers, myFetch } from 'lib/utils';
import React, { useState } from 'react';
import { CurrentUserProps } from 'types';

import Loader from '../reusable/Loader';
import ThingList from '../reusable/ThingList';

const AccountWines: React.FC<CurrentUserProps> = ({ currentUser }) => {
  const [savingStarted, setSavingStarted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [page, setPage] = useState(1);

  const { accountWines } = usePaginatedAccountWines(
    currentUser.account_id,
    page,
    8
  );

  async function deleteAccountWine(id: number) {
    if (!savingStarted) {
      setSavingStarted(true);
      const url = `api/accounts_wines`;
      const options = {
        headers,
        method: 'DELETE',
      };
      const mutateString = `api/account/${currentUser.account_id}/wines`
      const successMessage = 'Wine Deleted'
      await myFetch(url, options, mutateString, setSuccessMessage, setErrorMessage, successMessage)
    }
  }

  if (!accountWines) return <Loader />;
  console.log(accountWines);
  return (
    <ThingList
      title='Your Wines'
      data={accountWines}
      specificData={accountWines.wines}
      page={page}
      setPage={setPage}
      deleteable={true}
      deleteFn={deleteAccountWine}
      url='/editWine?id='
    />
  );
};

export default AccountWines;
