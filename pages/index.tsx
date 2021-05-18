import ProteinDisplay from 'components/proteins/ProteinDisplay';
import { CurrentUserProps } from 'types';

const Home: React.FC<CurrentUserProps> = ({ currentUser }) => {
  return <ProteinDisplay currentUser={currentUser} />;
};

export default Home;
