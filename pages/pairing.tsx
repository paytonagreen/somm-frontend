import { CurrentUserProps } from 'types';

import Pairing from 'components/proteins/Pairing';
import PleaseSignIn from 'components/userFlow/PleaseSignIn';

const PairingPage: React.FC<CurrentUserProps> = ({ currentUser }) => {
  return (
    <PleaseSignIn currentUser={currentUser}>
      <Pairing />
    </PleaseSignIn>
  );
};

export default PairingPage;
