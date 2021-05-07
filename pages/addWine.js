import AllWines from '../components/wines/AllWines';
import PleaseSignIn from '../components/userFlow/PleaseSignIn';

export default function AddWinePage({ currentUser }) {
  return (
    <PleaseSignIn currentUser={currentUser}>
      <AllWines />
    </PleaseSignIn>
  );
}
