import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { theme } from '../pages/AppStyles';

import EditWineForm from '../components/EditWineForm';

describe('<EditWineForm />', () => {
  beforeEach(() => {
    render(
      <ThemeProvider theme={theme}>
        <EditWineForm id={100} />
      </ThemeProvider>
    );
  });

  it.skip('renders with data', async () => {
    expect(await screen.findByText('Cabernet Sauvignon')).toBeInTheDocument();
  });

  it.skip('renders properly with data', async () => {
      await waitForElementToBeRemoved(screen.getByText(/Loading.../i))
      expect(await screen.findByText(/Edit Wine/)).toBeInTheDocument();
  });
});
