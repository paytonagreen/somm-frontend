import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { server, rest } from '../mocks/server';
import { render } from '../lib/test-utils';

import SignUp from '../components/userFlow/SignUp';

async function fillForm() {
  const username = await screen.findByLabelText(/Username/);
  const email = await screen.findByLabelText(/Email/);
  const password = await screen.findByLabelText(/Password/);
  await userEvent.type(username, 'Cool Guy');
  await userEvent.type(email, 'coolguy@coolguy.com');
  await userEvent.type(password, 'supersecretpassword');
}

async function clickSubmit() {
  const submit = screen.getByRole('button', { name: /Submit/i });
  await userEvent.click(submit);
}

const setCurrentUser = jest.fn();

describe('<SignUp />', () => {
  beforeEach(() => render(<SignUp setCurrentUser={setCurrentUser} />));

  it('renders correctly', () => {
    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
  });

  it('handles input correctly', async () => {
    await fillForm();
    expect(await screen.findByDisplayValue('Cool Guy')).toBeInTheDocument();
    expect(
      await screen.findByDisplayValue('coolguy@coolguy.com')
    ).toBeInTheDocument();
  });

  it('handles errors correctly', async () => {
    const testError = 'THIS IS A TEST ERROR';
    server.use(
      rest.post('*/users', async (req, res, ctx) => {
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
    expect(
      await screen.findByText(/Thank you for signing up!/i)
    ).toBeInTheDocument();
  });
});
