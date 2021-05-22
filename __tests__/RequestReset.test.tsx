import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { render } from 'lib/test-utils';

import RequestReset from 'components/userFlow/RequestReset';

async function fillForm() {
  const email = await screen.findByLabelText(/Email/i);
  userEvent.type(email, 'test@example.com');
}

describe('<RequestReset /> ', () => {
  beforeEach(() => {
    render(<RequestReset />);
  });
  it('renders properly', async () => {
    expect(screen.getByText(/Forgot Your Password?/i)).toBeInTheDocument();
  });

  it('handles form input correctly', async () => {
    await fillForm();
    expect(screen.getByDisplayValue(/test@example.com/i)).toBeInTheDocument();
  });

  it('submits data properly on button click', async () => {
    await fillForm();
    const button = screen.getByRole('button');
    userEvent.click(button);
    expect(await screen.findByText(/Reset Email Sent!/i)).toBeInTheDocument();
  });
});
