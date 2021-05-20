import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { server, rest } from 'mocks/server';
import { render, useServerUser, regUser, adminUser } from 'lib/test-utils';

import Sauce from 'components/sauces/Sauce';

const sauceRender = () => render(<Sauce id={100} />);

window.confirm = jest.fn(() => true)

describe('<Sauce />', () => {
  beforeEach(() => {
    useServerUser(regUser);
    sauceRender();
  });

  it('renders a loader', async () => {
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('renders properly', async () => {
    expect(await screen.findByText('Wine Matches')).toBeInTheDocument();
  });

  it('renders the <SaucesWinesList />', async () => {
    await screen.findByText('Wine Matches');
    expect(await screen.findByText(/Cabernet Sauvignon/i)).toBeInTheDocument();
  });
});

describe('<Sauce /> with admin user', () => {
  beforeEach(() => {
    useServerUser(adminUser);
    sauceRender();
  });

  it('renders the <DeleteSauce /> button with Admin', async () => {
    await screen.findByText('Wine Matches');
    expect(
      await screen.findByRole('button', { name: 'Delete' })
    ).toBeInTheDocument();
  });

  it('displays an errorMessage on error', async () => {
    const testError = 'THIS IS A TEST ERROR';
    server.use(
      rest.delete('*/sauces/100', async (req, res, ctx) => {
        return res.once(ctx.status(500), ctx.json({ message: testError }));
      })
    );
    await screen.findByText('Wine Matches');
    await userEvent.click(
      await screen.findByRole('button', { name: 'Delete' })
    );
    expect(await screen.findByText(testError)).toBeInTheDocument();
  });

  it('calls the deleteSauce function on button click', async () => {
    await screen.findByText('Wine Matches');
    await userEvent.click(
      await screen.findByRole('button', { name: 'Delete' })
    );
    expect(await screen.findByText('Sauce deleted!')).toBeInTheDocument();
  });
});
