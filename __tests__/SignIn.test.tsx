import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { render } from 'lib/test-utils';
import { server, rest } from 'mocks/server';

import SignIn from 'components/userFlow/SignIn';

async function fillForm() {
  const username = await screen.findByLabelText(/Username/);
  const password = await screen.findByLabelText(/Password/);
  await userEvent.type(username, 'coolguy');
  await userEvent.type(password, 'supersecretpassword');
}

async function clickSubmit() {
  const submit = screen.getByRole('button', { name: /Submit/i });
  await userEvent.click(submit);
}

jest.mock('next/router', () => ({
  push: jest.fn(),
}));

describe('<SignIn />', () => {
  beforeEach(() => render(<SignIn />));

  it('renders correctly', () => {
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
  });

  it('handles input correctly', async () => {
    await fillForm();
    expect(await screen.findByDisplayValue('coolguy')).toBeInTheDocument();
  });

  it('handles errors correctly', async () => {
    const testError = 'THIS IS A TEST ERROR';
    server.use(
      rest.post('*/login', async (req, res, ctx) => {
        return res.once(
          ctx.status(500),
          ctx.json({
            message: testError,
          })
        );
      })
    );
    await clickSubmit();
    expect(await screen.findByText(testError)).toBeInTheDocument();
  });

  it('sends data correctly on submit', async () => {
    await fillForm();
    await clickSubmit();
    expect(await screen.findByText(/Signing in.../i)).toBeInTheDocument();
  });
});