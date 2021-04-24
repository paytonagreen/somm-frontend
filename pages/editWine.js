import EditWine from '../components/wines/EditWine';

export default function EditWinePage(props) {
  return <EditWine id={props.query.id} />;
}
