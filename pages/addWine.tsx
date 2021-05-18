import { CurrentUserProps } from 'types';

import AllWines from 'components/wines/AllWines';
import PleaseSignIn from 'components/userFlow/PleaseSignIn';

const AddWinePage: React.FC<CurrentUserProps> = ({ currentUser }) => {
  return (
    <PleaseSignIn currentUser={currentUser}>
      <AllWines />
    </PleaseSignIn>
  );
};

export default AddWinePage;
