import { useProteins } from 'hooks/swr-hooks';

import AddProtein from './AddProtein';
import ProteinList from './ProteinList';
import AddPage from '../styles/AddPage';

export default function AllProteins() {
  const { proteins } = useProteins();

  if (!proteins) return 'Loading...';
  return (
    <AddPage>
      <ProteinList proteins={proteins} />
      <AddProtein />
    </AddPage>
  );
}
