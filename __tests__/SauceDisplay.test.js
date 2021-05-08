import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { render, regUser } from 'lib/test-utils';

import SauceDisplay from 'components/sauces/SauceDisplay';

describe('<SauceDisplay />', () => {
  beforeEach(async () => {
    render(<SauceDisplay currentUser={regUser} />);
  });

  it('renders a loader', async () => {
    //Pick back up once MSW is running
    expect(screen.getByText(/Loading/i)).toBeInTheDocument;
  });

  it('renders properly', async () => {
    expect(await screen.findByText(/Pick Your Sauce!/i)).toBeInTheDocument();
  });

  it('populates the menu with data', async () => {
    const dropdown = screen.getByRole('combobox', { name: /sauce/i });
    await userEvent.click(dropdown);
    expect(await screen.findByText('Marinara')).toBeInTheDocument();
  });

  it('renders the <Sauce /> component upon select', async () => {
    const dropdown = screen.getByRole('combobox', { name: /sauce/i });
    await userEvent.click(dropdown);
    await userEvent.selectOptions(dropdown, [
      screen.getByRole('option', { name: 'Marinara' }),
    ]);
    expect(await screen.findByText(/Loading.../i)).toBeInTheDocument();
    expect(await screen.findByText('Wine Matches')).toBeInTheDocument();
  });
});
