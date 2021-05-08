import Link from 'next/link';

import { useCurrentUser } from 'hooks/swr-hooks';

import SignOut from '../userFlow/SignOut';
import NavStyles from '../styles/NavStyles';

export default function Nav() {
  const { data, error } = useCurrentUser();

  if (!data && !error) return <p>'Loading...'</p>;
  const currentUser = data.user;
  return (
    <NavStyles>
      <Link href='/'>
        <a>
          <h1>A Somm For You</h1>
        </a>
      </Link>
      <ul>
        <li className='navOptions'>
          <p>Pair</p>
          <ul>
            <Link href='/protein'>
              <li>
                <a>By Protein</a>
              </li>
            </Link>
            <Link href='/sauce'>
              <li>
                <a>By Sauce</a>
              </li>
            </Link>
            <Link href='/sauceAndProtein'>
              <li>
                <a>By Sauce & Protein</a>
              </li>
            </Link>
          </ul>
        </li>
        {!currentUser && (
          <div className='signUp'>
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
          </div>
        )}
        {currentUser && currentUser.is_admin && (
          <li className='navOptions'>
            <p>Admin Options</p>
            <ul>
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
            </ul>
          </li>
        )}
      </ul>
      {currentUser && <SignOut />}
    </NavStyles>
  );
}
