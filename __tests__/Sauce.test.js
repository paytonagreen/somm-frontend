import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { server, rest } from 'mocks/server';
import { render, regUser, adminUser } from 'lib/test-utils';

import Sauce from 'components/sauces/Sauce';

const regRender = () => {
  render(<Sauce currentUser={regUser} id={100} />);
};
const adminRender = () => {
  render(<Sauce currentUser={adminUser} id={100} />);
};

describe('<Sauce />', () => {
  it('renders a loader', async () => {
    regRender();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('renders properly', async () => {
    regRender();
    expect(await screen.findByText('Wine Matches')).toBeInTheDocument();
  });

  it('renders the <SaucesWinesList />', async () => {
    regRender();
    await screen.findByText('Wine Matches');
    expect(await screen.findByText(/Cabernet Sauvignon/i)).toBeInTheDocument();
  });

  it('renders the <DeleteSauce /> button with Admin', async () => {
    adminRender();
    await screen.findByText('Wine Matches');
    expect(
      await screen.findByRole('button', { name: 'Delete' })
    ).toBeInTheDocument();
  });

  it('displays an errorMessage on error', async () => {
    adminRender();
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
    adminRender();
    await screen.findByText('Wine Matches');
    await userEvent.click(
      await screen.findByRole('button', { name: 'Delete' })
    );
    expect(await screen.findByText('Sauce deleted!')).toBeInTheDocument();
  });
});
