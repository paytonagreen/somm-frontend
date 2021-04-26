import AddWine from '../components/wines/AddWine';
import PleaseSignIn from '../components/userFlow/PleaseSignIn';

export default function AddWinePage({ currentUser }) {
  return (
    <PleaseSignIn currentUser={currentUser}>
      <AddWine />
    </PleaseSignIn>
  );
}
