import { useWines } from '../../hooks/swr-hooks';

import AddWine from './AddWine';
import WineList from './WineList';
import AddPage from '../styles/AddPage';

export default function AllWines() {
  const { wines } = useWines();

  if (!wines) return 'Loading...';
  console.log(wines);
  return (
    <AddPage>
      <WineList wines={wines} />
      <AddWine />
    </AddPage>
  );
}
