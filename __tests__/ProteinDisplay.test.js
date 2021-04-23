import { render, screen } from '@testing-library/react';
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

  it.skip('renders properly', async () => {
      //Pick back up once MSW is running
      expect(screen.getByText(/Loading/i)).toBeInTheDocument;
  })
});
