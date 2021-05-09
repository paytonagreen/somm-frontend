import { useSauces } from 'hooks/swr-hooks';

import AddSauce from './AddSauce';
import SauceList from './SauceList';
import AddPage from '../styles/AddPage';
import Loader from '../reusable/Loader';

export default function AllWines() {
  const { sauces } = useSauces();

  if (!sauces) return <Loader />;
  return (
    <AddPage>
      <AddSauce />
      <SauceList sauces={sauces} />
    </AddPage>
  );
}
