import { headers, myFetch } from 'lib/utils';
import { useEffect, useState } from 'react';
import { CurrentUserProps, FetchOptions } from 'types';
import WineList from '../../wines/WineList';

const AddAccountWines: React.FC<CurrentUserProps> = ({ currentUser }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [itemId, setItemId] = useState<number | undefined>();
  const [, setSuccessMessage] = useState('');
  const [, setErrorMessage] = useState('');

  useEffect(() => {
    if (isAdding) {
      const url = `api/accounts_wines`;
      const options: FetchOptions = {
        body: JSON.stringify({
          account_id: currentUser.account_id,
          wine_id: itemId,
        }),
        headers,
        method: 'POST',
      };
      const mutateString = `api/accounts/${currentUser.account_id}/wines?page=1&per_page=8`;
      myFetch(url, options, mutateString, setSuccessMessage, setErrorMessage);
    }
    setIsAdding(false);
  }, [isAdding]);

  async function addAccountWine(id: number) {
    setItemId(id);
    setIsAdding(true);
  }

  return <WineList addable addFn={addAccountWine} />;
};

export default AddAccountWines;
