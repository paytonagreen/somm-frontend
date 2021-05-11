import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { render, adminUser, regUser } from 'lib/test-utils';
import { server } from 'mocks/server';

import HamburgerNav from 'components/page/HamburgerNav';

const noUserRender = () => render(<HamburgerNav />);
const regUserRender = () => render(<HamburgerNav currentUser={regUser}/>);
const adminUserRender = () => render(<HamburgerNav currentUser={adminUser} />);

describe('<HamburgerNav /> with no user', () => { 
  beforeEach(() => {
    noUserRender();
  });
  it('renders properly', async () => {
    expect(await screen.findByText(/Pair/i)).toBeInTheDocument();
  });

  it(`renders view options`, async () => {
    expect(await screen.findByText('Pair')).toBeInTheDocument();
    expect(await screen.findByText('By Sauce')).toBeInTheDocument();
  });

  it(`renders 'Sign In' and 'Sign Up' links`, async () => {
    expect(await screen.findByText(/Sign In/)).toBeInTheDocument();
    expect(await screen.findByText(/Sign Up/)).toBeInTheDocument();
  });

  it(`does not render the 'Sign Out' button`, async () => {
    await screen.findByText(/Sign In/i);
    expect(screen.queryByText(/Sign Out/i)).not.toBeInTheDocument();
  });
});

describe('<HamburgerNav /> with regular user', () => {
  beforeEach(() => {
    regUserRender();
  });

  it(`renders the 'Sign Out' button`, async () => {
    expect(
      await screen.findByRole('button', { name: /Sign Out/i })
    ).toBeInTheDocument();
  });

  it(`does not render the 'Sign Up' or 'Sign In' links`, async () => {
    await screen.findByRole('button', { name: /Sign Out/i });
    expect(screen.queryByText(/Sign In/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Sign Up/i)).not.toBeInTheDocument();
  });

  it('does not render admin links', async () => {
    await screen.findByRole('button', { name: /Sign Out/i });
    expect(screen.queryByText(/Add Wine/i)).not.toBeInTheDocument();
  });
});

describe('<HamburgerNav /> with admin user', () => {
  beforeEach(() => {
    adminUserRender();
  });
  it('renders admin links and Sign Out button', async () => {
    expect(
      await screen.findByRole('button', { name: /Sign Out/i })
    ).toBeInTheDocument();
    expect(await screen.findByText(/Add Wine/i)).toBeInTheDocument();
  });

  it(`does not render the 'Sign Up' and 'Sign Out' links`, async () => {
    await screen.findByRole('button', { name: /Sign Out/i });
    expect(screen.queryByText(/Sign In/i)).not.toBeInTheDocument();
  });
});
