import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { render } from 'lib/test-utils';
import { server, rest } from 'mocks/server';

import ProteinDisplay from 'components/proteins/ProteinDisplay';
import { cache } from 'swr';

describe('<ProteinDisplay />', () => {
  beforeEach(() => cache.clear);
  const displayRender = () => render(<ProteinDisplay />);

  it('renders a loader', async () => {
    await displayRender();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument;
  });

  it('renders properly', async () => {
    await displayRender();
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
    expect(await screen.findByText(/Pick Your Protein!/i)).toBeInTheDocument();
  });

  it('populates the menu with data', async () => {
    await displayRender();
    await waitForElementToBeRemoved(screen.getByText(/Loading.../i));
    const dropdown = screen.getByRole('combobox', { name: /protein/i });
    await userEvent.click(dropdown);
    expect(await screen.findByText('Beef')).toBeInTheDocument();
  });

  it('warns of error with data', async () => {
    const testError = 'THIS IS A TEST ERROR';
    server.use(
      rest.get('*/proteins', async (req, res, ctx) => {
        return res.once(ctx.status(400), ctx.json({ message: testError }));
      })
      );
      await displayRender();
    expect(
      await screen.findByText(/Something went wrong.../i)
    ).toBeInTheDocument();
  });

  it('renders the <Protein /> component upon select', async () => {
    await displayRender();
    await waitForElementToBeRemoved(screen.getByText(/Loading/i));
    const dropdown = screen.getByRole('combobox', { name: /protein/i });
    await userEvent.click(dropdown);
    await userEvent.selectOptions(dropdown, [
      screen.getByRole('option', { name: 'Beef' }),
    ]);
    expect(await screen.findByText('Wine Matches')).toBeInTheDocument();
  });
});
