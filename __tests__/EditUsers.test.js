import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { server, rest } from '../mocks/server';
import { render } from 'lib/test-utils';

import EditUsers from 'components/userFlow/EditUsers';

const useUserDropdown = async () => {
  const userDropdown = screen.getByRole('combobox', { name: 'user' });
  await userEvent.click(userDropdown);
  await userEvent.selectOptions(userDropdown, [
    screen.getByRole('option', { name: 'coolguy' }),
  ]);
};

const useAdminDropdown = async () => {
  const adminDropdown = screen.getByRole('combobox', { name: 'admin' });
  await userEvent.click(adminDropdown);
  await userEvent.selectOptions(adminDropdown, [
    screen.getByRole('option', { name: 'Yes' }),
  ]);
};

describe('<EditUsers/>', () => {
  beforeEach(() => {
    render(<EditUsers />);
  });

  it('renders a loader', () => {
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  })

  it('renders properly', async () => {
    expect(await screen.findByText(/Choose User/i)).toBeInTheDocument();
  });

  it('renders all users in a dropdown', async () => {
    expect(await screen.findByText('coolguy')).toBeInTheDocument();
    expect(await screen.findByText(/realcoolguy/i)).toBeInTheDocument();
  });

  it('allows user to select a user, and displays <EditUser />', async () => {
    await screen.findByText('coolguy');
    await useUserDropdown();
    expect(await screen.findByText('Is Admin?')).toBeInTheDocument();
  });

  it(`displays the user's admin status`, async () => {
    await screen.findByText('coolguy');
    await useUserDropdown();
    expect(await screen.findByDisplayValue('No')).toBeInTheDocument();
  });

  it('allows user to select admin permissions', async () => {
    await useUserDropdown();
    await useAdminDropdown();
    expect(await screen.getByDisplayValue('Yes')).toBeInTheDocument();
  });

  it('submits data correctly', async () => {
    await useUserDropdown();
    await useAdminDropdown();
    await screen.getByDisplayValue('Yes');
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    await userEvent.click(submitButton);
    expect(await screen.findByText(/You Did It!/i)).toBeInTheDocument();
  });

  it('submits data correctly', async () => {
    const testError = 'THIS IS A TEST ERROR';
    server.use(
      rest.put('*/users/1', async (req, res, ctx) => {
        return res.once(ctx.status(500), ctx.json({ message: testError }));
      })
    );
    await useUserDropdown();
    await useAdminDropdown();
    await screen.getByDisplayValue('Yes');
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    await userEvent.click(submitButton);
    expect(await screen.findByText(testError)).toBeInTheDocument();
  });
});
