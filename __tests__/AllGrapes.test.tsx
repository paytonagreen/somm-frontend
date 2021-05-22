import { screen } from '@testing-library/react';

import { render } from 'lib/test-utils';

import AllGrapes from 'components/grapes/AllGrapes';
import userEvent from '@testing-library/user-event';

describe('<AllGrapes />', () => {
  beforeEach(() => {
    render(<AllGrapes />);
  });

  it('renders a loader', () => {
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('renders the list properly', async () => {
    expect(await screen.findByText(/Grapes/)).toBeInTheDocument();
  });

  it('renders the <AddProtein /> component properly', async () => {
    expect(await screen.findByText(/Add Grape/i)).toBeInTheDocument();
  });

  it('renders data properly', async () => {
    expect(await screen.findByText(/Cabernet Sauvignon/i)).toBeInTheDocument();
  });

  it('renders pagination button', async () => {
    await screen.findByText(/Cabernet Sauvignon/i);
    expect(
      await screen.findByRole('button', { name: 'Next' })
    ).toBeInTheDocument();
  });

  it('renders a new page on button click', async () => {
    await screen.findByText(/Cabernet Sauvignon/i);
    const nextButton = screen.getByRole('button', {name: 'Next'})
    await userEvent.click(nextButton)
    const previousButton = await screen.findByRole('button', {name: 'Previous'})
    expect(previousButton).toBeInTheDocument();
  });
});
