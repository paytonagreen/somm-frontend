import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { render } from '../lib/test-utils';
import { server, rest } from '../mocks/server';

import AddWine from '../components/wines/AddWine';

describe('<AddWine />', () => {
  beforeEach(async () => {
    render(<AddWine />);
  });

  async function fillForm() {
    const nameInput = screen.getByLabelText(/Name/i);
    const descriptionInput = screen.getByLabelText(/Description/i);
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'Boones Farm');
    await userEvent.clear(descriptionInput);
    await userEvent.type(descriptionInput, 'Super good');
  }

  it('renders properly', async () => {
    const nameInput = screen.getByLabelText(/Name/i);
    const descriptionInput = screen.getByLabelText(/Description/i);
    expect(nameInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
  });

  it('processes input', async () => {
    await fillForm();
    expect(await screen.findByDisplayValue('Boones Farm')).toBeInTheDocument();
    expect(await screen.findByDisplayValue('Super good')).toBeInTheDocument();
  });

  it('handles errors properly', async () => {
    const testErrorMessage = 'THIS IS A TEST FAILURE';
    await server.use(
      rest.post('*/wines', async (req, res, ctx) => {
        return res(ctx.status(400), ctx.json({ message: testErrorMessage }));
      })
    );
    await userEvent.click(await screen.getByRole('button', { name: 'submit' }));
    expect(await screen.findByText(testErrorMessage)).toBeInTheDocument();
  });

  it('submits the data properly and displays a successMessage', async () => {
    await fillForm();
    await userEvent.click(await screen.getByRole('button', { name: 'submit' }));
    expect(await screen.findByText('You did it!')).toBeInTheDocument();
  });
});
