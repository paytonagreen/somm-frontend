import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';

import AddWine from '../components/AddWine';
import { theme } from '../pages/_app';

describe('<AddWine />', () => {
  beforeEach(async () => {
    render(
      <ThemeProvider theme={theme}>
        <AddWine props={{ api: 'http://localhost:3000', headers: {} }} />
      </ThemeProvider>
    );
  });

  it('renders properly', async () => {
    const nameInput = screen.getByLabelText(/Name/i);
    const descriptionInput = screen.getByLabelText(/Description/i);
    expect(nameInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
  });

  it('processes input', async () => {
    const nameInput = screen.getByLabelText(/Name/i);
    const descriptionInput = screen.getByLabelText(/Description/i);
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'Boones Farm');
    await userEvent.clear(descriptionInput);
    await userEvent.type(descriptionInput, 'Super good')
    expect(await screen.findByDisplayValue('Boones Farm')).toBeInTheDocument();
    expect(await screen.findByDisplayValue('Super good')).toBeInTheDocument();
  });
});
