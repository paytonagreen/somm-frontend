import ProteinSearch from 'components/proteins/ProteinSearch';
import { CurrentUserProps } from 'types';

const ProteinSearchPage: React.FC<CurrentUserProps> = ({ currentUser }) => {
  return <ProteinSearch currentUser={currentUser} />;
};

export default ProteinSearchPage;
