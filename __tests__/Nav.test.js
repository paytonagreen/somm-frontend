import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { render, adminUser, useServerUser } from 'lib/test-utils';
import { server } from 'mocks/server';

import Nav from 'components/page/Nav';

const navRender = () => render(<Nav />);

describe('<Nav /> with no user', () => {
  beforeEach(() => {
    useServerUser(null);
    navRender();
  });
  it('renders properly', async () => {
    expect(await screen.findByText(/A Somm For You/i)).toBeInTheDocument();
  });

  it(`renders view options with no user`, async () => {
    expect(await screen.findByText('Pair')).toBeInTheDocument();
    expect(await screen.findByText('By Sauce')).toBeInTheDocument();
  });

  it(`renders 'Sign In' and 'Sign Up' links with no user`, async () => {
    expect(await screen.findByText(/Sign In/)).toBeInTheDocument();
    expect(await screen.findByText(/Sign Up/)).toBeInTheDocument();
  });

  it(`does not render the 'Sign Out' button with no user`, async () => {
    await screen.findByText(/Sign In/i);
    expect(screen.queryByText(/Sign Out/i)).not.toBeInTheDocument();
  });
});

describe('<Nav /> with regular user', () => {
  beforeEach(() => {
    navRender();
  });

  it(`renders the 'Sign Out' button with regular user`, async () => {
    expect(
      await screen.findByRole('button', { name: /Sign Out/i })
    ).toBeInTheDocument();
  });

  it(`does not render the 'Sign Up' or 'Sign In' links regular user`, async () => {
    await screen.findByRole('button', { name: /Sign Out/i });
    expect(screen.queryByText(/Sign In/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Sign Up/i)).not.toBeInTheDocument();
  });

  it('does not render admin links with regular user', async () => {
    await screen.findByRole('button', { name: /Sign Out/i });
    expect(screen.queryByText(/Add Wine/i)).not.toBeInTheDocument();
  });

  it('signs out on <SignOut /> click', async () => {
    const signOut = await screen.findByRole('button', { name: /Sign Out/i });
    server.resetHandlers();
    useServerUser(null);
    await userEvent.click(signOut);
    expect(await screen.findByText(/Sign In/i)).toBeInTheDocument();
  });
});

describe('<Nav /> with admin user', () => {
  beforeEach(() => {
    useServerUser(adminUser);
    navRender();
  });
  it('renders admin links and Sign Out button with admin user', async () => {
    expect(
      await screen.findByRole('button', { name: /Sign Out/i })
    ).toBeInTheDocument();
    expect(await screen.findByText(/Add Wine/i)).toBeInTheDocument();
  });

  it(`does not render the 'Sign Up' and 'Sign Out' links with admin user`, async () => {
    await screen.findByRole('button', { name: /Sign Out/i });
    expect(screen.queryByText(/Sign In/i)).not.toBeInTheDocument();
  });
});
