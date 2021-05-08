import Pairing from 'components/proteins/Pairing';
import PleaseSignIn from 'components/userFlow/PleaseSignIn';

export default function PairingPage({ currentUser }) {
  return (
    <PleaseSignIn currentUser={currentUser}>
      <Pairing />
    </PleaseSignIn>
  );
}
