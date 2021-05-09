import { useProteins } from 'hooks/swr-hooks';

import AddProtein from './AddProtein';
import ProteinList from './ProteinList';
import AddPage from '../styles/AddPage';
import Loader from '../reusable/Loader'

export default function AllProteins() {
  const { proteins } = useProteins();

  if (!proteins) return <Loader/>;
  return (
    <AddPage>
      <AddProtein />
      <ProteinList proteins={proteins} />
    </AddPage>
  );
}
