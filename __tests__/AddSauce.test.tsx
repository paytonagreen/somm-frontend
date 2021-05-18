import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { render } from 'lib/test-utils';
import { server, rest } from 'mocks/server';

import AddSauce from 'components/sauces/AddSauce';

describe('<AddSauce />', () => {
  beforeEach(async () => {
    render(<AddSauce />);
  });

  async function fillForm() {
    const nameInput = screen.getByLabelText(/Name/i);
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'Thai Curry');
  }

  it('renders properly', async () => {
    const nameInput = screen.getByLabelText(/Name/i);
    expect(nameInput).toBeInTheDocument();
  });

  it('processes input', async () => {
    await fillForm();
    expect(await screen.findByDisplayValue('Thai Curry')).toBeInTheDocument();
  });

  it('handles errors properly', async () => {
    const testErrorMessage = 'THIS IS A TEST FAILURE';
    await server.use(
      rest.post('*/sauces', async (req, res, ctx) => {
        return res(ctx.status(400), ctx.json({ message: testErrorMessage }));
      })
    );
    await userEvent.click(await screen.getByRole('button', { name: 'Submit' }));
    expect(await screen.findByText(testErrorMessage)).toBeInTheDocument();
  });

  it('submits the data properly and displays a successMessage', async () => {
    await fillForm();
    await userEvent.click(await screen.getByRole('button', { name: 'Submit' }));
    expect(await screen.findByText('You did it!')).toBeInTheDocument();
  });
});
