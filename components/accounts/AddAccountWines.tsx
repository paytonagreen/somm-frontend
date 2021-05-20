import { headers, myFetch } from 'lib/utils';
import { useState } from 'react';
import { CurrentUserProps, FetchOptions } from 'types';
import WineList from '../wines/WineList';

const AddAccountWines: React.FC<CurrentUserProps> = ({ currentUser }) => {
  const [savingStarted, setSavingStarted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  console.log(successMessage, errorMessage);
  async function addAccountWine(id: number) {
    if (!savingStarted) {
      setSavingStarted(true);
      const url = `api/accounts_wines`;
      const options: FetchOptions = {
        body: JSON.stringify({
          account_id: currentUser.account_id,
          wine_id: id,
        }),
        headers,
        method: 'POST',
      };
      const mutateString = url;
      await myFetch(
        url,
        options,
        mutateString,
        setSuccessMessage,
        setErrorMessage
      );
    }
  }

  return <WineList addable addFn={addAccountWine} />;
};

export default AddAccountWines;
