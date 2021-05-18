import Link from 'next/link';

const homeLink = (
  <Link href='/'>
    <a className="homeLink" >
      <h1>A Somm For You</h1>
    </a>
  </Link>
);

const navOptions = (
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
);

const adminOptions = (
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
);

const noUserOptions = (
  <div className='signUp'>
    <Link href='/signUp'>
      <a aria-label='Sign Up'>
        <li>Sign Up</li>
      </a>
    </Link>
    <Link href='/signIn'>
      <a aria-label='Sign In'>
        <li>Sign In</li>
      </a>
    </Link>
  </div>
);

export { homeLink, navOptions, adminOptions, noUserOptions };
