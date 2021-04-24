import Link from 'next/link';

import NavStyles from '../styles/NavStyles';

export default function Nav() {
  return (
    <NavStyles>
      <Link href='/'>
        <a>
          <h1>A Somm For You</h1>
        </a>
      </Link>
      <Link href='/pairing'>
        <a>
          <p>Pair by Protein</p>
        </a>
      </Link>
      <Link href='/saucePairing'>
        <a>
          <p>Pair by Sauce</p>
        </a>
      </Link>
      <Link href='/addProtein'>
        <a>
          <p>Add Protein</p>
        </a>
      </Link>
      <Link href='/addWine'>
        <a>
          <p>Add Wine</p>
        </a>
      </Link>
      <Link href='/addSauce'>
        <a>
          <p>Add Sauce</p>
        </a>
      </Link>
    </NavStyles>
  );
}
