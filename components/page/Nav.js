import Link from 'next/link';

import SignOut from '../userFlow/SignOut';
import NavStyles from '../styles/NavStyles';

export default function Nav({setCurrentUser, currentUser}) {
  
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
            <li><a>
              <p>Sign Up</p>
            </a></li>
          </Link>
          <Link href='/signIn'>
            <li><a>
              <p>Sign In</p>
            </a></li>
          </Link>
        </>
      )}
      {currentUser && currentUser.is_admin && (
        <>
          <Link href='/pairing'>
            <li><a>
              <p>Pair by Protein</p>
            </a></li>
          </Link>
          <Link href='/saucePairing'>
            <li><a>
              <p>Pair by Sauce</p>
            </a></li>
          </Link>
          <Link href='/addProtein'>
            <li><a>
              <p>Add Protein</p>
            </a></li>
          </Link>
          <Link href='/addWine'>
            <li><a>
              <p>Add Wine</p>
            </a></li>
          </Link>
          <Link href='/addSauce'>
            <li><a>
              <p>Add Sauce</p>
            </a></li>
          </Link>
        </>
      )}
      </ul>
      {currentUser && <SignOut setCurrentUser={setCurrentUser} />}
    </NavStyles>
  );
}
