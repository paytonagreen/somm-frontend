import { useWines } from 'hooks/swr-hooks';

import AddWine from './AddWine';
import WineList from './WineList';
import AddPage from '../styles/AddPage';
import Loader from '../reusable/Loader';

export default function AllWines() {
  const { wines } = useWines();

  if (!wines) return <Loader />;
  return (
    <AddPage>
      <AddWine />
      <WineList wines={wines} />
    </AddPage>
  );
}
