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
import Loader from '../reusable/Loader';
import HamburgerButton from './HamburgerButton';
import HamburgerNav from './HamburgerNav';

export default function Nav({ toggleBurger }) {
  const { data, error } = useCurrentUser();

  const [burgerOpen, setBurgerOpen] = useState(false);

  function toggleBurger() {
    setBurgerOpen(!burgerOpen);
  }

  if (!data && !error) return <Loader />;
  console.log(data);
  const currentUser = data.user;
  console.log(currentUser);
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
      <HamburgerNav
        burgerOpen={burgerOpen}
        setBurgerOpen={setBurgerOpen}
        currentUser={data.user}
        toggleBurger={toggleBurger}
      />
    </>
  );
}
