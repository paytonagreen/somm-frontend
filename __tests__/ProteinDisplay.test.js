import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { render } from '../lib/test-utils';

import ProteinDisplay from '../components/proteins/ProteinDisplay';

describe('<ProteinDisplay />', () => {
  beforeEach(async () => {
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
    const dropdown = screen.getByRole('combobox', { name: /protein/i });
    await userEvent.click(dropdown);
    expect(await screen.findByText('Beef')).toBeInTheDocument();
  });

  it('renders the <Protein /> component upon select', async () => {
    const dropdown = screen.getByRole('combobox', { name: /protein/i });
    await userEvent.click(dropdown);
    await userEvent.selectOptions(dropdown, [
      screen.getByRole('option', { name: 'Beef' }),
    ]);
    expect(await screen.findByText('Wine Matches')).toBeInTheDocument();
  });
});
