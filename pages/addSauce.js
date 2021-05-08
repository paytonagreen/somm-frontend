import AllSauces from '../components/sauces/AllSauces';
import PleaseSignIn from '../components/userFlow/PleaseSignIn';

export default function AllSaucesPage({ currentUser }) {
  return (
    <PleaseSignIn currentUser={currentUser}>
      <AllSauces />
    </PleaseSignIn>
  );
}
