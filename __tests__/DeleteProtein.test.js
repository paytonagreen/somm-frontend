import { render, screen } from '@testing-library/react';

import { theme } from '../pages/AppStyles';

import { ThemeProvider } from 'styled-components';
import DeleteProtein from '../components/DeleteProtein';

describe('<DeleteProtein />', () => {
  beforeEach(async () => {
    render(
      <ThemeProvider theme={theme}>
        <DeleteProtein id={55} />
      </ThemeProvider>
    );
  });

  it('renders correctly', async () => {
    expect(await screen.findByRole('button', {name: 'Delete'})).toBeInTheDocument();
  });
});
