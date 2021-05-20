import AddItem from '../reusable/AddItem';
import SauceList from './SauceList';
import AddPage from '../styles/AddPage';

export default function AllWines() {
  return (
    <AddPage>
      <AddItem name='sauce' />
      <SauceList />
    </AddPage>
  );
}
