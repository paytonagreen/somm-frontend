import { CurrentUserProps } from 'types';
import WineDisplay from '../../wines/WineDisplay';

const AccountWineDisplay: React.FC<CurrentUserProps> = ({ currentUser }) => {
  return <WineDisplay id={currentUser.account_id} />;
};

export default AccountWineDisplay;
