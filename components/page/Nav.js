import Link from 'next/link';

import { useCurrentUser } from 'hooks/swr-hooks';

import SignOut from '../userFlow/SignOut';
import NavStyles from '../styles/NavStyles';
import Loader from '../reusable/Loader';

export default function Nav() {
  const { data, error } = useCurrentUser();

  if (!data && !error) return <Loader />;
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
              <a>
                <li>By Protein</li>
              </a>
            </Link>
            <Link href='/sauce'>
              <a>
                <li>By Sauce</li>
              </a>
            </Link>
            <Link href='/sauceAndProtein'>
              <a>
                <li>By Sauce & Protein</li>
              </a>
            </Link>
          </ul>
        </li>
        {!currentUser && (
          <div className='signUp'>
            <Link href='/signUp'>
              <a name='Sign Up'>
                <li>Sign Up</li>
              </a>
            </Link>
            <Link href='/signIn'>
              <a name='Sign In'>
                <li>Sign In</li>
              </a>
            </Link>
          </div>
        )}
        {currentUser && currentUser.is_admin && (
          <li className='navOptions'>
            <p>Admin Options</p>
            <ul>
              <Link href='/pairing'>
                <a>
                  <li>Pair by Protein</li>
                </a>
              </Link>
              <Link href='/saucePairing'>
                <a>
                  <li>Pair by Sauce</li>
                </a>
              </Link>
              <Link href='/addProtein'>
                <a>
                  <li>Add Protein</li>
                </a>
              </Link>
              <Link href='/addWine'>
                <a>
                  <li>Add Wine</li>
                </a>
              </Link>
              <Link href='/addSauce'>
                <a>
                  <li>Add Sauce</li>
                </a>
              </Link>
            </ul>
          </li>
        )}
      </ul>
      {currentUser && <SignOut />}
    </NavStyles>
  );
}
