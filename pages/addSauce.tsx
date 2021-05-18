import { CurrentUserProps } from 'types';

import AllSauces from 'components/sauces/AllSauces';
import PleaseSignIn from 'components/userFlow/PleaseSignIn';


const AllSaucesPage: React.FC<CurrentUserProps> = ({ currentUser }) => {
  return (
    <PleaseSignIn currentUser={currentUser}>
      <AllSauces />
    </PleaseSignIn>
  );
};

export default AllSaucesPage;
