import { useWines } from 'hooks/swr-hooks';

import AddWine from './AddWine';
import WineList from './WineList';
import AddPage from '../styles/AddPage';

export default function AllWines() {
  const { wines } = useWines();

  if (!wines) return 'Loading...';
  return (
    <AddPage>
      <AddWine />
      <WineList wines={wines} />
    </AddPage>
  );
}
