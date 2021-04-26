import EditWine from '../components/wines/EditWine';
import PleaseSignIn from '../components/userFlow/PleaseSignIn';

export default function EditWinePage(props) {
  return (
    <PleaseSignIn>
      <EditWine currentUser={props.currentUser} id={props.query.id} />;
    </PleaseSignIn>
  );
}
