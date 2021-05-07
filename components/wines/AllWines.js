import { useWines } from '../../hooks/swr-hooks';

import AddWine from './AddWine';
import WineList from './WineList';
import WinesPage from '../styles/WinesPage';

export default function AllWines() {
  const { wines } = useWines();

  if (!wines) return 'Loading...';
  console.log(wines);
  return (
    <WinesPage>
      <WineList wines={wines} />
      <AddWine />
    </WinesPage>
  );
}
