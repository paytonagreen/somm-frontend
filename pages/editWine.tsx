import EditWine from 'components/wines/EditWine';
import PleaseSignIn from 'components/userFlow/PleaseSignIn';
import { CurrentUserAndQueryProps } from 'types';

const EditWinePage: React.FC<CurrentUserAndQueryProps> = (props) => {
  return (
    <PleaseSignIn currentUser={props.currentUser}>
      <EditWine id={parseInt(props.query.id)} />
    </PleaseSignIn>
  );
};

export default EditWinePage;
