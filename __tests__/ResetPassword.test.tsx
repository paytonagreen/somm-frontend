import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { render } from 'lib/test-utils';

import ResetPassword from 'components/userFlow/ResetPassword';
import { rest, server } from 'mocks/server';

async function fillForm() {
  const password = await screen.findByLabelText(/New Password/i);
  const confirmPassword = await screen.findByLabelText(/Confirm Password/i);
  userEvent.type(password, 'passtest');
  userEvent.type(confirmPassword, 'passtest');
}

async function fillFormWrong() {
  const password = await screen.findByLabelText(/New Password/i);
  const confirmPassword = await screen.findByLabelText(/Confirm Password/i);
  userEvent.type(password, 'passtest');
  userEvent.type(confirmPassword, 'passsstest');
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
    expect(screen.getAllByDisplayValue(/passtest/i)).toHaveLength(2);
  });

  it('handles password validation correctly', async () => {
    await fillFormWrong();
    expect(await screen.findByText(/Both password fields must match/i)).toBeInTheDocument();
  })

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
