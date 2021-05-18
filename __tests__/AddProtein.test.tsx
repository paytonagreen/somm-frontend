import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { server, rest } from 'mocks/server';
import { render } from 'lib/test-utils';

import AddProtein from 'components/proteins/AddProtein';

async function fillForm() {
  const input = await screen.findByRole('textbox');
  await userEvent.clear(input);
  await userEvent.type(input, 'Beef Jerky');
}

describe('<AddProtein />', () => {
  beforeEach(async () => {
    render(<AddProtein />);
  });

  it('renders properly', async () => {
    const input = await screen.findByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('processes input', async () => {
    await fillForm();
    expect(await screen.findByDisplayValue('Beef Jerky')).toBeInTheDocument();
  });

  it('submits the data properly and displays a successMessage', async () => {
    await fillForm();
    await userEvent.click(await screen.getByRole('button', { name: 'Submit' }));
    expect(await screen.findByText('You did it!')).toBeInTheDocument();
  });

  it('handles errors properly', async () => {
    const testErrorMessage = 'THIS IS A TEST FAILURE';
    await server.use(
      rest.post('*/proteins', async (req, res, ctx) => {
        return res.once(
          ctx.status(400),
          ctx.json({ message: testErrorMessage })
        );
      })
    );
    await userEvent.click(await screen.getByRole('button', { name: 'Submit' }));
    expect(await screen.findByText(testErrorMessage)).toBeInTheDocument();
  });
});
