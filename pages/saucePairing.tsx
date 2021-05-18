import SaucePairing from 'components/sauces/SaucePairing';
import PleaseSignIn from 'components/userFlow/PleaseSignIn';
import { CurrentUserProps } from 'types';

const SaucePairingPage: React.FC<CurrentUserProps> = ({ currentUser }) => {
  return (
    <PleaseSignIn currentUser={currentUser}>
      <SaucePairing />
    </PleaseSignIn>
  );
};

export default SaucePairingPage;
