import AddSauce from '../components/sauces/AddSauce';
import PleaseSignIn from '../components/userFlow/PleaseSignIn';

export default function AddSaucePage({ currentUser }) {
  return (
    <PleaseSignIn currentUser={currentUser}>
      <AddSauce />
    </PleaseSignIn>
  );
}
