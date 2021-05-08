import { useSauces } from 'hooks/swr-hooks';

import AddSauce from './AddSauce';
import SauceList from './SauceList';
import AddPage from '../styles/AddPage';

export default function AllWines() {
  const { sauces } = useSauces();

  if (!sauces) return 'Loading...';
  return (
    <AddPage>
      <SauceList sauces={sauces} />
      <AddSauce />
    </AddPage>
  );
}