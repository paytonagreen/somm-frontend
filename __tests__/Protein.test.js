import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';

import { theme } from '../pages/AppStyles';
import {server, rest } from '../mocks/server';

import Protein from '../components/proteins/Protein';

describe('<Protein />', () => {
  beforeEach(() => {
    render(
      <ThemeProvider theme={theme}>
        <Protein id={55} />
      </ThemeProvider>
    );
  });
  it('renders a loader', async () => {
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('renders properly', async () => {
    expect(await screen.findByText('Wine Matches')).toBeInTheDocument();
  });

  it('renders the <WinesList />', async () => {
    await screen.findByText('Wine Matches');
    expect(await screen.findByText(/Cabernet Sauvignon/i)).toBeInTheDocument();
  });

  it('renders the <DeleteProtein /> button', async () => {
    await screen.findByText('Wine Matches');
    expect(screen.findByRole('button', { name: 'Delete' })).toBeInTheDocument;
  });
  
  it('displays an errorMessage on error', async () => {
      const testError = 'THIS IS A TEST ERROR'
      server.use(
        rest.delete('*/proteins/55', async (req, res, ctx) => {
            return res.once(ctx.status(500), ctx.json({message: testError}));
          }),
      )
      await screen.findByText('Wine Matches');
    await waitFor(async () => {
      userEvent.click(await screen.findByRole('button', {name: 'Delete'}))
    })
    expect(await screen.findByText(testError)).toBeInTheDocument;
  })

  it('calls the deleteProtein function on button click', async () => {
    await screen.findByText('Wine Matches');
    await userEvent.click(await screen.getByRole('button', {name: 'Delete'}));
    expect(await screen.findByText('Protein deleted!')).toBeInTheDocument;
  });

});
