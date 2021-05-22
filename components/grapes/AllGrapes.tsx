import AddGrape from './AddGrape';
import GrapeList from './GrapeList';
import AddPage from '../styles/AddPage';

export default function AllGrapes() {
  return (
    <AddPage>
      <AddGrape />
      <GrapeList addable={false} />
    </AddPage>
  );
}
