import {
    render,
    screen,
    waitForElementToBeRemoved,
  } from '@testing-library/react';
  import userEvent from '@testing-library/user-event';
  import { ThemeProvider } from 'styled-components';
  
  import { theme } from '../components/styles/AppStyles';
  import {server, rest} from '../mocks/server';
  
  import SaucePairing from '../components/sauces/SaucePairing';
  
  describe('<SaucePairing />', () => {
    beforeEach(() => {
      render(
        <ThemeProvider theme={theme}>
          <SaucePairing />
        </ThemeProvider>
      );
    });
  
    it('renders a loader', async () => {
      expect(await screen.findByText(/Loading.../i)).toBeInTheDocument();
    });
  
    it('clears loader and renders with data', async () => {
      await waitForElementToBeRemoved(screen.getByText(/Loading/i));
      expect(await screen.findByText(/Pairing!/i)).toBeInTheDocument();
    });
  
    it('renders the dropdown menus', async () => {
      expect(await screen.findByText(/Pairing!/i)).toBeInTheDocument();
      expect(
        await screen.findByRole('combobox', { name: 'wine_id' })
      ).toBeInTheDocument();
      expect(
        await screen.findByRole('combobox', { name: 'sauce_id' })
      ).toBeInTheDocument();
    });
  
    it('populates the dropdown menus with data', async () => {
      await screen.findByText(/Pairing/i);
      const wineDropdown = await screen.findByRole('combobox', {
        name: 'wine_id',
      });
      await userEvent.click(wineDropdown);
      expect(await screen.findByText(/Cabernet Sauvignon/i)).toBeInTheDocument();
      await userEvent.selectOptions(wineDropdown, [
        screen.getByRole('option', { name: 'Cabernet Sauvignon' }),
      ]);
      const sauceDropdown = await screen.findByRole('combobox', {
        name: 'sauce_id',
      });
      await userEvent.click(sauceDropdown);
      await userEvent.selectOptions(sauceDropdown, [
        screen.getByRole('option', { name: 'Marinara' }),
      ]);
      expect(await screen.findByText(/Marinara/i)).toBeInTheDocument();
    });
  
    it('submits data on button click', async () => {
      await screen.findByText(/Pairing/i);
      const wineDropdown = await screen.findByRole('combobox', {
        name: 'wine_id',
      });
      const sauceDropdown = await screen.findByRole('combobox', {
        name: 'sauce_id',
      });
      await userEvent.click(wineDropdown);
      await userEvent.selectOptions(wineDropdown, [
        screen.getByRole('option', { name: 'Cabernet Sauvignon' }),
      ]);
      await userEvent.click(sauceDropdown);
      await userEvent.click(
        await screen.findByRole('button', { name: /Pair 'Em Up!/i })
      );
      expect(await screen.findByText(/Paired Up!/i)).toBeInTheDocument();
    });
  
    it('handles errors on button click', async () => {
      const testError = 'THIS IS A TEST ERROR'
      server.use(
        rest.post('*/wines_sauces', async (req, res, ctx) => {
          return res.once(
            ctx.status(500),
            ctx.json({
              message: testError,
            })
          )
        })
      );
      await userEvent.click(await screen.findByRole('button', {name: /Pair 'Em Up!/i}))
      expect(await screen.findByText(testError)).toBeInTheDocument();
    })
  });
  