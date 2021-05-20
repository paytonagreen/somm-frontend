import Add from '../reusable/AddItem';
import ProteinList from './ProteinList';
import AddPage from '../styles/AddPage';

export default function AllProteins() {
  return (
    <AddPage>
      <Add destination="proteins" name="Protein" />
      <ProteinList />
    </AddPage>
  );
}
