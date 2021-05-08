import EditUsers from 'components/userFlow/EditUsers';
import PleaseSignIn from 'components/userFlow/PleaseSignIn';

export default function EditUsersPage({ currentUser }) {
  return (
    <PleaseSignIn currentUser={currentUser}>
      <EditUsers currentUser={currentUser} />
    </PleaseSignIn>
  );
}
