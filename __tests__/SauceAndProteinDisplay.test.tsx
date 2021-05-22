import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { render } from 'lib/test-utils';

import SauceAndProteinDisplay from 'components/sauceAndProtein/SauceAndProteinDisplay';

describe('<SauceAndProteinDisplay />', () => {
  beforeEach(async () => {
    render(<SauceAndProteinDisplay />);
  });

  it('renders a loader', async () => {
    expect(screen.getByText(/Loading/i)).toBeInTheDocument;
  });

  it('renders properly', async () => {
    await waitForElementToBeRemoved(screen.getByText(/Loading/i));
    expect(await screen.findByText(/Pick Your:/i)).toBeInTheDocument();
    expect(await screen.findByText(/Sauce!/i)).toBeInTheDocument();
    expect(await screen.findByText(/Protein!/i)).toBeInTheDocument();
  });

  it('populates the menu with data', async () => {
    await waitForElementToBeRemoved(screen.getByText(/Loading/i));
    const dropdown = screen.getByRole('combobox', { name: /sauce/i });
    await userEvent.click(dropdown);
    expect(await screen.findByText('Marinara')).toBeInTheDocument();
  });

  it('renders the <SauceAndProteinGrapeList /> component upon select', async () => {
    await waitForElementToBeRemoved(screen.getByText(/Loading/i));
    const sauceDropdown = screen.getByRole('combobox', { name: /sauce/i });
    const proteinDropdown = screen.getByRole('combobox', { name: /protein/i });
    await userEvent.selectOptions(sauceDropdown, [
      screen.getByRole('option', { name: 'Marinara' }),
    ]);
    await userEvent.selectOptions(proteinDropdown, [
      screen.getByRole('option', { name: 'Beef' }),
    ]);
    expect(await screen.findByText('Grape Matches')).toBeInTheDocument();
  });

  it('populates the <SauceAndProteinsGrapesList /> with data', async () => {
    await waitForElementToBeRemoved(screen.getByText(/Loading/i));
    const sauceDropdown = screen.getByRole('combobox', { name: /sauce/i });
    const proteinDropdown = screen.getByRole('combobox', { name: /protein/i });
    await userEvent.selectOptions(sauceDropdown, [
      screen.getByRole('option', { name: 'Marinara' }),
    ]);
    await userEvent.selectOptions(proteinDropdown, [
      screen.getByRole('option', { name: 'Beef' }),
    ]);
    await screen.findByText('Grape Matches');
    expect(await screen.findByText('Cabernet Sauvignon')).toBeInTheDocument();
  });
});
