import Link from 'next/link';

import {noUserOptions } from './NavOptions';

import NavStyles from '../styles/NavStyles';

export default function Nav() {
  return (
    <NavStyles>
      <Link href='/'>
        <a>
          <h1>A Somm For You</h1>
        </a>
      </Link>
      {noUserOptions}
    </NavStyles>
  );
}
