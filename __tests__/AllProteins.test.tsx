import { screen } from '@testing-library/react';

import { render } from 'lib/test-utils';

import AllProteins from 'components/proteins/AllProteins';
import { rest, server } from 'mocks/server';
import userEvent from '@testing-library/user-event';

describe('<AllProteins />', () => {
  beforeEach(() => {
    render(<AllProteins />);
  });

  it('renders a loader', () => {
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('renders the list properly', async () => {
    expect(await screen.findByText(/Proteins/)).toBeInTheDocument();
  });

  it('renders the <AddProtein /> component properly', async () => {
    expect(await screen.findByText(/Add Protein/i)).toBeInTheDocument();
  });

  it('renders data properly', async () => {
    expect(await screen.findByText(/Beef/i)).toBeInTheDocument();
  });
});

async function fillForm() {
  const input = await screen.findByRole('textbox');
  await userEvent.clear(input);
  await userEvent.type(input, 'Beef Jerky');
}

describe('the Protein <AddItem /> component', () => {
  beforeEach(async () => {
    render(<AllProteins />);
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
