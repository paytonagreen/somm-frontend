import AccountDishesDisplay from '@/components/accounts/dishes/AccountDishesManager';
import { CurrentUserProps } from 'types';

const AccountDishesPage: React.FC<CurrentUserProps> = ({ currentUser }) => {
  return <AccountDishesDisplay currentUser={currentUser} />;
};

export default AccountDishesPage;
