import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { regUser, adminUser, render, useServerUser } from 'lib/test-utils';
import { server, rest } from 'mocks/server';

import Protein from 'components/proteins/Protein';

window.confirm = jest.fn(() => true);

const renderProtein = () => render(<Protein id={100} />);

describe('<Protein /> with regular user', () => {
  beforeEach(() => {
    useServerUser(regUser);
    renderProtein();
  });
  it('renders a loader', async () => {
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('renders properly', async () => {
    expect(await screen.findByText('Grape Matches')).toBeInTheDocument();
  });

  it('renders the <WinesList />', async () => {
    await screen.findByText('Grape Matches');
    expect(await screen.findByText(/Cabernet Sauvignon/i)).toBeInTheDocument();
  });
});

describe('<Protein /> with admin user', () => {
  beforeEach(() => {
    useServerUser(adminUser);
    renderProtein();
  });

  it('renders the <DeleteProtein /> button', async () => {
    await screen.findByText('Grape Matches');
    expect(
      await screen.findByRole('button', { name: 'Delete' })
    ).toBeInTheDocument();
  });

  it('displays an errorMessage on delete error', async () => {
    const testError = 'THIS IS A TEST ERROR';
    server.use(
      rest.delete('*/proteins/100', async (req, res, ctx) => {
        return res.once(ctx.status(500), ctx.json({ message: testError }));
      })
    );
    await screen.findByText('Grape Matches');
    await waitFor(async () => {
      userEvent.click(await screen.findByRole('button', { name: 'Delete' }));
    });
    expect(await screen.findByText(testError)).toBeInTheDocument();
  });

  it('calls the deleteProtein function on button click', async () => {
    await screen.findByText('Grape Matches');
    await userEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(await screen.findByText('Protein deleted!')).toBeInTheDocument();
  });
});
