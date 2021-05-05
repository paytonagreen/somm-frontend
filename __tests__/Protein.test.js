import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';

import { regUser, adminUser } from '../lib/test-utils';
import { theme } from '../components/styles/AppStyles';
import { server, rest } from '../mocks/server';

import Protein from '../components/proteins/Protein';

const regRender = () => {
  render(
    <ThemeProvider theme={theme}>
      <Protein currentUser={regUser} id={55} />
    </ThemeProvider>
  );
};

const adminRender = () => {
  render(
    <ThemeProvider theme={theme}>
      <Protein currentUser={adminUser} id={55} />
    </ThemeProvider>
  );
};

describe('<Protein />', () => {
  it('renders a loader', async () => {
    regRender();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('renders properly', async () => {
    regRender();
    expect(await screen.findByText('Wine Matches')).toBeInTheDocument();
  });

  it('renders the <WinesList />', async () => {
    regRender();
    await screen.findByText('Wine Matches');
    expect(await screen.findByText(/Cabernet Sauvignon/i)).toBeInTheDocument();
  });

  it('renders the <DeleteProtein /> button', async () => {
    adminRender();
    await screen.findByText('Wine Matches');
    expect(await screen.findByRole('button', { name: 'Delete' })).toBeInTheDocument();
  });

  it('displays an errorMessage on delete error', async () => {
    adminRender();
    const testError = 'THIS IS A TEST ERROR';
    server.use(
      rest.delete('*/proteins/55', async (req, res, ctx) => {
        return res.once(ctx.status(500), ctx.json({ message: testError }));
      })
    );
    await screen.findByText('Wine Matches');
    await waitFor(async () => {
      userEvent.click(await screen.findByRole('button', { name: 'Delete' }));
    });
    expect(await screen.findByText(testError)).toBeInTheDocument();
  });

  it('calls the deleteProtein function on button click', async () => {
    adminRender();
    await screen.findByText('Wine Matches');
    await userEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(await screen.findByText('Protein deleted!')).toBeInTheDocument();
  });
});
