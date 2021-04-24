import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';

import {server, rest } from '../mocks/server';
import { theme } from '../pages/AppStyles';

import EditWine from '../components/EditWine';

async function fillForm() {
  const name = await screen.findByLabelText(/Name/i);
  const description = await screen.findByLabelText(/Description/i);
  await userEvent.clear(name);
  await userEvent.clear(description);
  await userEvent.type(name, 'Beaujolais');
  await userEvent.type(description, 'Always good');
}

describe('<EditWine />', () => {
  beforeEach(() => {
    render(
      <ThemeProvider theme={theme}>
        <EditWine id={100} />
      </ThemeProvider>
    );
  });

  it('renders a loader', async () => {
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('renders properly with data', async () => {
    expect(await screen.findByText(/Edit Wine/)).toBeInTheDocument();
  });

  it('fills the form with preexisting data', async () => {
    expect(
      await screen.findByDisplayValue(/Cabernet Sauvignon/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByDisplayValue(/An absolute classic/i)
    ).toBeInTheDocument();
  });

  it('processes input correctly', async () => {
    fillForm();
    expect(await screen.findByDisplayValue(/Beaujolais/i)).toBeInTheDocument();
  });

  it('handles errors properly', async () => {
      const testError = 'THIS IS A TEST ERROR'
      server.use(
          rest.put('*/wines/100', async (req, res, ctx) => {
              return res.once(
                  ctx.status(500),
                  ctx.json({
                      message: testError
                  })
              )
          })
      )
      await userEvent.click(screen.getByRole('button', { name: 'Submit' }));
      expect (await screen.findByText(testError)).toBeInTheDocument();
  })

  it('submits data on button click', async () => {
    fillForm();
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));
    expect(await screen.findByText(/Saved successfully./i)).toBeInTheDocument();
  });
});