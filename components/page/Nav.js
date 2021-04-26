import Link from 'next/link';

import SignOut from '../userFlow/SignOut';
import NavStyles from '../styles/NavStyles';

export default function Nav({currentUser}) {
  return (
    <NavStyles>
      <Link href='/'>
        <a>
          <h1>A Somm For You</h1>
        </a>
      </Link>
      {!currentUser && (
        <>
          <Link href='/signUp'>
            <a>
              <p>Sign Up</p>
            </a>
          </Link>
          <Link href='/signIn'>
            <a>
              <p>Sign In</p>
            </a>
          </Link>
        </>
      )}
      {currentUser && currentUser.is_admin && (
        <>
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
        </>
      )}
      {currentUser && <SignOut />}
    </NavStyles>
  );
}
