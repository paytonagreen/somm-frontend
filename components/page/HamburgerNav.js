import { navOptions, adminOptions, noUserOptions } from './NavOptions';

import BurgerCloseButton from '../styles/BurgerCloseButton';
import BurgerStyles from '../styles/BurgerStyles';
import SignOut from '../userFlow/SignOut';

const HamburgerNav = ({ burgerOpen, toggleBurger, currentUser }) => {
  return (
    <BurgerStyles onClick={toggleBurger} data-testid='burger' open={burgerOpen}>
      <BurgerCloseButton onClick={toggleBurger}>&times;</BurgerCloseButton>
      <ul>
        {navOptions}
        {!currentUser && noUserOptions}
        {currentUser && currentUser.is_admin && adminOptions}
      </ul>
      {currentUser && <SignOut />}
    </BurgerStyles>
  );
};

export default HamburgerNav;
