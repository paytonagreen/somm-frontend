import { CurrentUserProps } from 'types';
import WineDisplay from '../../wines/WineDisplay';

const AccountWineDisplay: React.FC<CurrentUserProps> = ({ currentUser }) => {
  return <WineDisplay currentUser={currentUser} />;
};

export default AccountWineDisplay;
