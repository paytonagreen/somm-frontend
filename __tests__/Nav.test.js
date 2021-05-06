import { screen } from '@testing-library/react';

import { render, regUser, adminUser } from '../lib/test-utils';

import Nav from '../components/page/Nav';

const noUserRender = () => render(<Nav />);
const regRender = () => render(<Nav currentUser={regUser} />);
const adminRender = () => render(<Nav currentUser={adminUser} />);

describe('<Nav />', () => {
  it('renders properly', async () => {
    await noUserRender();
    expect(await screen.findByText(/A Somm For You/i)).toBeInTheDocument();
  });

  it(`renders 'Sign In' and 'Sign Up' links with no user`, async () => {
    await noUserRender();
    expect(await screen.findByText(/Sign In/)).toBeInTheDocument();
    expect(await screen.findByText(/Sign Up/)).toBeInTheDocument();
  });

  it(`does not render the 'Sign Out' button with no user`, async () => {
    await noUserRender();
    await screen.findByText(/Sign In/i);
    expect(screen.queryByText(/Sign Out/i)).not.toBeInTheDocument();
  });

  it(`renders the 'Sign Out' button with regular user`, async () => {
    await regRender();
    expect(
      await screen.findByRole('button', { name: /Sign Out/i })
    ).toBeInTheDocument();
  });

  it(`does not render the 'Sign Up' or 'Sign In' links regular user`, async () => {
    await regRender();
    await screen.findByRole('button', { name: /Sign Out/i });
    expect(screen.queryByText(/Sign In/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Sign Up/i)).not.toBeInTheDocument();
  });

  it('does not render admin links with regular user', async () => {
    await regRender();
    await screen.findByRole('button', { name: /Sign Out/i });
    expect(screen.queryByText(/Add Wine/i)).not.toBeInTheDocument();
  });

  it('renders admin links and Sign Out button with admin user', async () => {
    await adminRender();
    expect(
      await screen.findByRole('button', { name: /Sign Out/i }),
    ).toBeInTheDocument();
    expect(await screen.findByText(/Add Wine/i)).toBeInTheDocument();
  });

  it(`does not render the 'Sign Up' and 'Sign Out' links with admin user`, async () => {
    await adminRender();
    await screen.findByRole('button', {name: /Sign Out/i})
    expect(screen.queryByText(/Sign In/i)).not.toBeInTheDocument();
  })
});
