import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { render } from 'lib/test-utils';
import { server, rest } from 'mocks/server';

import Pairing from 'components/proteins/Pairing';

async function selectOptions() {
  await screen.findByText(/Pairing/i);
  const grapeDropdown = await screen.findByRole('combobox', {
    name: 'grape_id',
  });
  await userEvent.click(grapeDropdown);
  expect(await screen.findByText(/Cabernet Sauvignon/i)).toBeInTheDocument();
  await userEvent.selectOptions(grapeDropdown, [
    screen.getByRole('option', { name: 'Cabernet Sauvignon' }),
  ]);
  const proteinDropdown = await screen.findByRole('combobox', {
    name: 'protein_id',
  });
  await userEvent.click(proteinDropdown);
  await userEvent.selectOptions(proteinDropdown, [
    screen.getByRole('option', { name: 'Beef' }),
  ]);
}

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
      await screen.findByRole('combobox', { name: 'grape_id' })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole('combobox', { name: 'protein_id' })
    ).toBeInTheDocument();
  });

  it('populates the dropdown menus with data', async () => {
    await selectOptions();
    expect(await screen.findByText(/Beef/i)).toBeInTheDocument();
  });

  it('submits data on button click', async () => {
    await selectOptions
    await userEvent.click(
      await screen.findByRole('button', { name: /Pair 'Em Up!/i })
    );
    expect(await screen.findByText(/Paired Up!/i)).toBeInTheDocument();
  });

  it('handles errors on button click', async () => {
    const testError = 'THIS IS A TEST ERROR';
    server.use(
      rest.post('*/proteins_grapes', async (req, res, ctx) => {
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
