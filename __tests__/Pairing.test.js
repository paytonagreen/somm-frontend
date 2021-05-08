import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { render } from 'lib/test-utils';
import { server, rest } from 'mocks/server';

import Pairing from 'components/proteins/Pairing';

describe('<Pairing />', () => {
  beforeEach(() => {
    render(<Pairing />);
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
      await screen.findByRole('combobox', { name: 'protein_id' })
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
    const proteinDropdown = await screen.findByRole('combobox', {
      name: 'protein_id',
    });
    await userEvent.click(proteinDropdown);
    await userEvent.selectOptions(proteinDropdown, [
      screen.getByRole('option', { name: 'Beef' }),
    ]);
    expect(await screen.findByText(/Beef/i)).toBeInTheDocument();
  });

  it('submits data on button click', async () => {
    await screen.findByText(/Pairing/i);
    const wineDropdown = await screen.findByRole('combobox', {
      name: 'wine_id',
    });
    const proteinDropdown = await screen.findByRole('combobox', {
      name: 'protein_id',
    });
    await userEvent.click(wineDropdown);
    await userEvent.selectOptions(wineDropdown, [
      screen.getByRole('option', { name: 'Cabernet Sauvignon' }),
    ]);
    await userEvent.click(proteinDropdown);
    await userEvent.click(
      await screen.findByRole('button', { name: /Pair 'Em Up!/i })
    );
    expect(await screen.findByText(/Paired Up!/i)).toBeInTheDocument();
  });

  it('handles errors on button click', async () => {
    const testError = 'THIS IS A TEST ERROR';
    server.use(
      rest.post('*/wines_proteins', async (req, res, ctx) => {
        return res.once(
          ctx.status(500),
          ctx.json({
            message: testError,
          })
        );
      })
    );
    await userEvent.click(
      await screen.findByRole('button', { name: /Pair 'Em Up!/i })
    );
    expect(await screen.findByText(testError)).toBeInTheDocument();
  });
});
