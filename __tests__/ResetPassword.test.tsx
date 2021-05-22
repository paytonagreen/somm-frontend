import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { render } from 'lib/test-utils';

import ResetPassword from 'components/userFlow/ResetPassword';
import { rest, server } from 'mocks/server';

async function fillForm() {
  const password = await screen.findByLabelText(/Password/i);
  userEvent.type(password, 'passtest');
}

describe('<ResetPassword /> ', () => {
  beforeEach(() => {
    render(<ResetPassword token="123123" />);
  });
  it('renders properly', async () => {
    expect(screen.getByText(/Reset Password/i)).toBeInTheDocument();
  });

  it('handles form input correctly', async () => {
    await fillForm();
    expect(screen.getByDisplayValue(/passtest/i)).toBeInTheDocument();
  });

  it('submits data properly on button click', async () => {
    await fillForm();
    const button = screen.getByRole('button');
    userEvent.click(button);
    expect(await screen.findByText(/Password Reset!/i)).toBeInTheDocument();
  });

  it('handles errors on submit properly', async () => {
    const testError = 'THIS IS A TEST ERROR MESSAGE';
    server.use(
      rest.post('*/password/reset', async (req, res, ctx) => {
        return res.once(ctx.status(500), ctx.json({ message: testError }));
      })
    );
    const button = screen.getByRole('button');
    userEvent.click(button);
    expect(await screen.findByText(testError)).toBeInTheDocument();
  });
});
