import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from 'styled-components';

import ProteinDisplay from '../components/ProteinDisplay';
import {theme} from '../pages/_app';

describe('<ProteinDisplay />', () => {
  beforeEach(async () => {
    render(
        <ThemeProvider theme={theme}>
            <ProteinDisplay/>
        </ThemeProvider>
    );
  });

  it('renders a loader', async () => {
      //Pick back up once MSW is running
      expect(screen.getByText(/Loading/i)).toBeInTheDocument;
  })

  it('renders properly', async () => {
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i))
    await userEvent.click(screen.getByRole('combobox', { name: /protein/i}))
    expect(await screen.findByText('Beef')).toBeInTheDocument();
  })
});
