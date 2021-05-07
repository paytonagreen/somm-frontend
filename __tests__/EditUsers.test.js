import { screen, waitForElementToBeRemoved } from '@testing-library/react';

import { render } from '../lib/test-utils';

import EditUsers from '../components/userFlow/EditUsers';
import userEvent from '@testing-library/user-event';

describe('<EditUsers/>', () => {
  beforeEach(() => {
    render(<EditUsers />);
  });

  it('renders properly', async () => {
    expect(await screen.findByText(/Choose User/i)).toBeInTheDocument();
  });

  it('renders all users in a dropdown', async () => {
    expect(await screen.findByText('coolguy')).toBeInTheDocument();
    expect(await screen.findByText(/realcoolguy/i)).toBeInTheDocument();
  });

  it('allows user to select a user, and displays <EditUser />', async () => {
    await screen.findByText('coolguy');
    const dropdown = screen.getByRole('combobox', { name: 'user' });
    await userEvent.click(dropdown);
    await userEvent.selectOptions(dropdown, [
      screen.getByRole('option', { name: 'coolguy' }),
    ]);
    expect(await screen.findByText(/Is Admin?/i)).toBeInTheDocument();
  });
});
