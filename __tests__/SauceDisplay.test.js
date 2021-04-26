import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from 'styled-components';

import SauceDisplay from '../components/sauces/SauceDisplay';
import {theme} from '../components/styles/AppStyles';

describe('<SauceDisplay />', () => {
  beforeEach(async () => {
    render(
        <ThemeProvider theme={theme}>
            <SauceDisplay/>
        </ThemeProvider>
    );
  });

  
  it('renders a loader', async () => {
    //Pick back up once MSW is running
    expect(screen.getByText(/Loading/i)).toBeInTheDocument;
  })
  
  it('renders properly', async () => {
    expect(await screen.findByText(/Pick Your Sauce!/i)).toBeInTheDocument();
  })
  
  it('populates the menu with data', async () => {
    const dropdown = screen.getByRole('combobox', {name: /sauce/i})
    await userEvent.click(dropdown)
    expect(await screen.findByText('Marinara')).toBeInTheDocument();
  })

  it('renders the <Sauce /> component upon select', async () => {
    const dropdown = screen.getByRole('combobox', {name: /sauce/i})
    await userEvent.click(dropdown)
    await userEvent.selectOptions(dropdown, [screen.getByRole('option', {name: 'Marinara'})])
    expect(await screen.findByText('Wine Matches')).toBeInTheDocument();
  })
});
