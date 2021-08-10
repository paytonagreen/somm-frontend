import { usePaginatedAccountWines } from 'hooks/swr-hooks';
import { headers, myFetch } from 'lib/utils';
import React, { useEffect, useState } from 'react';
import { CurrentUserProps } from 'types';

import Loader from '../../reusable/Loader';
import ThingList from '../../reusable/ThingList';

const AccountWines: React.FC<CurrentUserProps> = ({ currentUser }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [itemId, setItemId] = useState<number | undefined>();
  const [, setSuccessMessage] = useState('');
  const [, setErrorMessage] = useState('');
  const [page, setPage] = useState(1);

  const { accountWines } = usePaginatedAccountWines(
    currentUser.account_id,
    page,
    8
  );

  useEffect(() => {
    if (isDeleting) {
      const url = `api/accounts_wines/${itemId}`;
      const options = {
        headers,
        method: 'DELETE',
        body: JSON.stringify({
          id: itemId,
          account_id: currentUser.account_id,
        }),
      };
      const mutateString = `api/accounts/${currentUser.account_id}/wines?page=1&per_page=8`;
      const successMessage = 'Wine Deleted';
      myFetch(
        url,
        options,
        mutateString,
        setSuccessMessage,
        setErrorMessage,
        successMessage
      );
    }
    setIsDeleting(false);
  }, [isDeleting]);

  async function deleteAccountWine(id: number) {
    setItemId(id);
    setIsDeleting(true);
  }

  if (!accountWines) return <Loader />;
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
