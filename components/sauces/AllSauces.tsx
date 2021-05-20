import Add from '../reusable/AddItem';
import SauceList from './SauceList';
import AddPage from '../styles/AddPage';

export default function AllWines() {
  return (
    <AddPage>
      <Add destination='sauces' name='Sauce' />
      <SauceList />
    </AddPage>
  );
}
