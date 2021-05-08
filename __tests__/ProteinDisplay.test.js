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
  beforeEach(async () => {
    cache.clear();
    render(<ProteinDisplay />);
  });

  it('renders a loader', async () => {
    //Pick back up once MSW is running
    expect(screen.getByText(/Loading/i)).toBeInTheDocument;
  });

  it('renders properly', async () => {
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
    expect(await screen.findByText(/Pick Your Protein!/i)).toBeInTheDocument();
  });

  it('populates the menu with data', async () => {
    await waitForElementToBeRemoved(screen.getByText(/Loading.../i));
    const dropdown = screen.getByRole('combobox', { name: /protein/i });
    await userEvent.click(dropdown);
    expect(await screen.findByText('Beef')).toBeInTheDocument();
  });

  it.only('warns of error with data', async () => {
    server.use(
      rest.get('api/proteins', async (req, res, ctx) => {
        console.log('sup');
        return res(ctx.status(500), ctx.json({ message: 'Big Error' }));
      })
    );
    expect(
      await screen.findByText(/Something went wrong.../i)
    ).toBeInTheDocument();
  });

  it('renders the <Protein /> component upon select', async () => {
    await waitForElementToBeRemoved(screen.getByText(/Loading/i));
    const dropdown = screen.getByRole('combobox', { name: /protein/i });
    await userEvent.click(dropdown);
    await userEvent.selectOptions(dropdown, [
      screen.getByRole('option', { name: 'Beef' }),
    ]);
    expect(await screen.findByText('Wine Matches')).toBeInTheDocument();
  });
});
