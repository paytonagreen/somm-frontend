import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';

import { theme } from '../components/styles/AppStyles';
import { server, rest } from '../mocks/server';

import SignOut from '../components/userFlow/SignOut';

describe('<SignOut />', () => {
  beforeEach(() => {
    render(
      <ThemeProvider theme={theme}>
        <SignOut />
      </ThemeProvider>
    );
  });

  it('renders the <SignOut /> button', async () => {
    expect(await screen.findByRole('button', { name: 'Sign Out' })).toBeInTheDocument;
  });

  it('displays an errorMessage on delete error', async () => {
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
    expect(await screen.findByText(`You're signed out!`)).toBeInTheDocument;
  });
});
