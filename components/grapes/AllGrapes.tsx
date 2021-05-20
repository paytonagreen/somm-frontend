import AddWine from './AddWine';
import WineList from './WineList';
import AddPage from '../styles/AddPage';

export default function AllWines() {
  return (
    <AddPage>
      <AddWine />
      <WineList addable={false} />
    </AddPage>
  );
}
