import { useProteins } from 'hooks/swr-hooks';

import AddProtein from './AddProtein';
import ProteinList from './ProteinList';
import AddPage from '../styles/AddPage';
import Loader from '../reusable/Loader'

export default function AllProteins() {
  return (
    <AddPage>
      <AddProtein />
      <ProteinList />
    </AddPage>
  );
}
