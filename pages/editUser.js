import EditUser from '../components/userFlow/EditUser';
import PleaseSignIn from '../components/userFlow/PleaseSignIn';

export default function EditUserPage({ currentUser }) {
  return (
    <PleaseSignIn currentUser={currentUser}>
      <EditUser currentUser={currentUser} />
    </PleaseSignIn>
  );
}
