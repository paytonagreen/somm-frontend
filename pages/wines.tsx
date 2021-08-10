import WineDisplay from 'components/wines/WineDisplay';
import { CurrentUserProps } from 'types';

const Wines: React.FC<CurrentUserProps> = ({ currentUser }) => {
  return <WineDisplay currentUser={currentUser} />;
};

export default Wines;
