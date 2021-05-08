import { screen, waitForElementToBeRemoved } from '@testing-library/react';

import { render, regUser, adminUser } from 'lib/test-utils';

import Nav from 'components/page/Nav';
import { server, rest } from 'mocks/server';

const navRender = () => render(<Nav />);

// useServer mocks a server response with the desired 'user'
const useServer = (user) => {
  server.use(
    rest.get('*/logged_in', async (req, res, ctx) => {
      return res.once(ctx.json({ logged_in: false, user: user }));
    })
  );
};

describe('<Nav /> with no user', () => {
  beforeEach(() => {
    useServer(null);
    navRender();
  })
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
});

describe('<Nav /> with admin user', () => {
  beforeEach(() => {
    useServer(adminUser)
    navRender()
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
