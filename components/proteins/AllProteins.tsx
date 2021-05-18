import AddProtein from './AddProtein';
import ProteinList from './ProteinList';
import AddPage from '../styles/AddPage';

export default function AllProteins() {
  return (
    <AddPage>
      <AddProtein />
      <ProteinList />
    </AddPage>
  );
}
