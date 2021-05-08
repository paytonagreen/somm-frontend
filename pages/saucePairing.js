import SaucePairing from 'components/sauces/SaucePairing';
import PleaseSignIn from 'components/userFlow/PleaseSignIn';

export default function SaucePairingPage({ currentUser }) {
  return (
    <PleaseSignIn currentUser={currentUser}>
      <SaucePairing />
    </PleaseSignIn>
  );
}
