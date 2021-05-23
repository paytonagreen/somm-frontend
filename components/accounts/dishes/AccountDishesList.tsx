import { usePaginatedAccountDishes } from 'hooks/swr-hooks';
import { headers, myFetch } from 'lib/utils';
import React, { useEffect, useState } from 'react';
import { CurrentUserProps } from 'types';

import Loader from '../../reusable/Loader';
import ThingList from '../../reusable/ThingList';

const AccountDishesList: React.FC<CurrentUserProps> = ({ currentUser }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [itemId, setItemId] = useState<number | undefined>();
  const [, setSuccessMessage] = useState('');
  const [, setErrorMessage] = useState('');
  const [page, setPage] = useState(1);

  const { accountDishes } = usePaginatedAccountDishes(
    currentUser.account_id,
    page,
    8
  );

  useEffect(() => {
    if (isDeleting) {
      const url = `api/accounts_dishes/${itemId}`;
      const options = {
        headers,
        method: 'DELETE',
        body: JSON.stringify({
          itemId,
          account_id: currentUser.account_id,
        }),
      };
      const mutateString = `api/accounts/${currentUser.account_id}/dishes?page=1&per_page=8`;
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

  async function deleteAccountDish(id: number) {
    setItemId(id);
    setIsDeleting(true);
  }

  if (!accountDishes) return <Loader />;
  console.log(accountDishes);
  return (
    <ThingList
      title='Your Dishes'
      data={accountDishes}
      specificData={accountDishes.dishes}
      page={page}
      setPage={setPage}
      deleteable={true}
      deleteFn={deleteAccountDish}
      url='/editDishes?id='
    />
  );
};

export default AccountDishesList;
