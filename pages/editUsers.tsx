import EditUsers from 'components/userFlow/EditUsers';
import PleaseSignIn from 'components/userFlow/PleaseSignIn';
import { CurrentUserProps } from 'types';

const EditUsersPage: React.FC<CurrentUserProps> = ({ currentUser }) => {
  return (
    <PleaseSignIn currentUser={currentUser}>
      <EditUsers />
    </PleaseSignIn>
  );
};

export default EditUsersPage;
