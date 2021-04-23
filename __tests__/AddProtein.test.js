import {
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';

import AddProtein from '../components/AddProtein';
import { theme } from '../pages/_app';

describe('<AddProtein />', () => {
  beforeEach(async () => {
    render(
      <ThemeProvider theme={theme}>
        <AddProtein props={{ api: 'http://localhost:3000', headers: {} }} />
      </ThemeProvider>
    );
  });

  it('renders properly', async () => {
    const input = await screen.findByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('processes input', async () => {
    const input = await screen.findByRole('textbox');
    await userEvent.clear(input);
    await userEvent.type(input, 'Beef Jerky');
    expect(await screen.findByDisplayValue('Beef Jerky')).toBeInTheDocument();
  });

  
});
