import Link from 'next/link';

import SignOut from '../userFlow/SignOut';
import NavStyles from '../styles/NavStyles';

export default function Nav({ setCurrentUser, currentUser }) {
  return (
    <NavStyles>
      <Link href='/'>
        <a>
          <h1>A Somm For You</h1>
        </a>
      </Link>
      <ul>
        {!currentUser && (
          <>
            <Link href='/signUp'>
              <li>
                <a name='Sign Up'>Sign Up</a>
              </li>
            </Link>
            <Link href='/signIn'>
              <li>
                <a name='Sign In'>Sign In</a>
              </li>
            </Link>
          </>
        )}
        {currentUser && currentUser.is_admin && (
          <>
            <Link href='/pairing'>
              <li>
                <a>Pair by Protein</a>
              </li>
            </Link>
            <Link href='/saucePairing'>
              <li>
                <a>Pair by Sauce</a>
              </li>
            </Link>
            <Link href='/addProtein'>
              <li>
                <a>Add Protein</a>
              </li>
            </Link>
            <Link href='/addWine'>
              <li>
                <a>Add Wine</a>
              </li>
            </Link>
            <Link href='/addSauce'>
              <li>
                <a>Add Sauce</a>
              </li>
            </Link>
          </>
        )}
      </ul>
      {currentUser && <SignOut setCurrentUser={setCurrentUser} />}
    </NavStyles>
  );
}
