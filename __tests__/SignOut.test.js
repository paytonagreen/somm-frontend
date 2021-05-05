import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { render } from '../lib/test-utils';
import { server, rest } from '../mocks/server';

import SignOut from '../components/userFlow/SignOut';

const setCurrentUser = jest.fn();

describe('<SignOut />', () => {
  beforeEach(() => {
    render(<SignOut setCurrentUser={setCurrentUser} />);
  });

  it('renders the <SignOut /> button', async () => {
    expect(await screen.findByRole('button', { name: 'Sign Out' }))
      .toBeInTheDocument;
  });

  it('displays an errorMessage on error', async () => {
    const testError = 'THIS IS A TEST ERROR';
    server.use(
      rest.post('*/logout', async (req, res, ctx) => {
        return res.once(ctx.status(500), ctx.json({ message: testError }));
      })
    );
    await userEvent.click(
      await screen.findByRole('button', { name: 'Sign Out' })
    );
    expect(await screen.findByText(testError)).toBeInTheDocument;
  });

  it('calls the signOut function on button click', async () => {
    await userEvent.click(screen.getByRole('button', { name: 'Sign Out' }));
    expect(await screen.findByText(`Thanks! See ya later!`)).toBeInTheDocument;
  });
});
