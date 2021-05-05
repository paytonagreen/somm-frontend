import { render, screen } from '@testing-library/react';

import { theme } from '../components/styles/AppStyles';

import { ThemeProvider } from 'styled-components';
import DeleteProtein from '../components/proteins/DeleteProtein';

describe('<DeleteProtein />', () => {
  beforeEach(async () => {
    render(
      <ThemeProvider theme={theme}>
        <DeleteProtein id={100} />
      </ThemeProvider>
    );
  });

  it('renders correctly', async () => {
    expect(await screen.findByRole('button', {name: 'Delete'})).toBeInTheDocument();
  });
});
