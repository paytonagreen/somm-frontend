import AllProteins from '../components/proteins/AllProteins';
import PleaseSignIn from '../components/userFlow/PleaseSignIn';

export default function AddProteinPage({ currentUser }) {
  return (
    <PleaseSignIn currentUser={currentUser}>
      <AllProteins />
    </PleaseSignIn>
  );
}
