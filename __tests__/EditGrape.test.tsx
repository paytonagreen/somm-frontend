import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { render } from 'lib/test-utils';
import { server, rest } from 'mocks/server';

import EditGrape from 'components/grapes/EditGrape';

async function fillForm() {
  const name = await screen.findByLabelText(/Name/i);
  const description = await screen.findByLabelText(/Description/i);
  await screen.findByDisplayValue(/Cabernet Sauvignon/i);
  userEvent.clear(name);
  userEvent.clear(description);
  userEvent.type(name, 'Beaujolais');
  userEvent.type(description, 'Always good');
}

window.confirm = jest.fn(() => true);

describe('<EditGrape />', () => {
  beforeEach(() => {
    render(<EditGrape id={100} />);
  });

  it('renders a loader', async () => {
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('renders properly with data', async () => {
    expect(await screen.findByText(/Edit Grape/)).toBeInTheDocument();
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
    await waitFor(() => fillForm());
    expect(await screen.findByDisplayValue(/Beaujolais/i)).toBeInTheDocument();
  });

  it('handles submit errors properly', async () => {
    const testError = 'THIS IS A TEST ERROR';
    server.use(
      rest.put('*/grapes/100', async (req, res, ctx) => {
        return res.once(
          ctx.status(500),
          ctx.json({
            message: testError,
          })
        );
      })
    );
    await waitForElementToBeRemoved(screen.getByText(/Loading/i));
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));
    expect(await screen.findByText(testError)).toBeInTheDocument();
  });

  it('submits data on button click', async () => {
    await waitFor(() => fillForm());
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));
    expect(await screen.findByText(/Saved successfully./i)).toBeInTheDocument();
  });

  it('handles delete errors correctly', async () => {
    const testError = 'THIS IS A TEST ERROR';
    server.use(
      rest.delete('*/grapes/100', async (req, res, ctx) => {
        return res.once(
          ctx.status(500),
          ctx.json({
            message: testError,
          })
        );
      })
    );
    await waitForElementToBeRemoved(screen.getByText(/Loading.../i));
    await userEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(await screen.findByText(testError)).toBeInTheDocument();
  });

  it('deletes data on button click', async () => {
    await waitForElementToBeRemoved(screen.getByText(/Loading.../i));
    await userEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(await screen.findByText(/Grape deleted!/i)).toBeInTheDocument();
  });
});
