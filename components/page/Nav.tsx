import { useState } from 'react';

import { useCurrentUser } from 'hooks/swr-hooks';
import {
  homeLink,
  navOptions,
  adminOptions,
  noUserOptions,
} from './NavOptions';

import SignOut from '../userFlow/SignOut';
import NavStyles from '../styles/NavStyles';
import HamburgerButton from './HamburgerButton';
import HamburgerNav from './HamburgerNav';

export default function Nav() {
  const { data, isError } = useCurrentUser();

  const [burgerOpen, setBurgerOpen] = useState(false);

  function toggleBurger() {
    setBurgerOpen(!burgerOpen);
  }

  if (!data && !isError) return <p></p>;
  const currentUser = data.user;
  return (
    <>
      <NavStyles>
        {homeLink}
        <ul>
          {navOptions}
          {!currentUser && noUserOptions}
          {currentUser && currentUser.is_admin && adminOptions}
        </ul>
        {currentUser && <SignOut />}
        <HamburgerButton toggleBurger={toggleBurger} />
      </NavStyles>
      {burgerOpen && (
        <HamburgerNav
          burgerOpen={burgerOpen}
          currentUser={data.user}
          toggleBurger={toggleBurger}
        />
      )}
    </>
  );
}
