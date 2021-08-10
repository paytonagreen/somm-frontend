import styled from 'styled-components';
import { CurrentUserProps } from 'types';

import AccountDishesList from './AccountDishesList';
import AddAccountDishes from './AddAccountDishes';

const AccountPageStyles = styled.div`
  width: 50vw;
  height: 75vh;
  display: flex;
  justify-content: space-around;
`;

const AccountDishesDisplay: React.FC<CurrentUserProps> = ({ currentUser }) => {
  return (
    <AccountPageStyles>
      <AddAccountDishes currentUser={currentUser} />
      <AccountDishesList currentUser={currentUser} />
    </AccountPageStyles>
  );
};

export default AccountDishesDisplay;
