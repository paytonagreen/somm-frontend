import { headers, myFetch } from 'lib/utils';
import { useEffect, useState } from 'react';
import { CurrentUserProps, FetchOptions } from 'types';
import DishList from '../dishes/DishList';

const AddAccountDishes: React.FC<CurrentUserProps> = ({ currentUser }) => {
  const [itemId, setItemId] = useState<number | undefined>();
  const [isAdding, setIsAdding] = useState(false);
  const [, setSuccessMessage] = useState('');
  const [, setErrorMessage] = useState('');

  useEffect(() => {
    if (isAdding) {
      const url = `api/accounts_dishes`;
      const options: FetchOptions = {
        body: JSON.stringify({
          account_id: currentUser.account_id,
          dish_id: itemId,
        }),
        headers,
        method: 'POST',
      };
      const mutateString = `api/accounts/${currentUser.id}/dishes?page=1&per_page=8`;
      myFetch(url, options, mutateString, setSuccessMessage, setErrorMessage);
    }
    setIsAdding(false);
  }, [isAdding]);

  async function addAccountDish(id: number) {
    setItemId(id);
    setIsAdding(true);
  }

  return <DishList addable addFn={addAccountDish} />;
};

export default AddAccountDishes;
