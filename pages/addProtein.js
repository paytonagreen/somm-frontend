import AddProtein from '../components/proteins/AddProtein';
import PleaseSignIn from '../components/userFlow/PleaseSignIn';

export default function AddProteinPage({ currentUser }) {
  return (
    <PleaseSignIn currentUser={currentUser}>
      <AddProtein />
    </PleaseSignIn>
  );
}
