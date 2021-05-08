import { screen } from '@testing-library/react';

import { render } from 'lib/test-utils';

import AllSauces from 'components/sauces/AllSauces';

describe('<AllSauces />', () => {
  beforeEach(() => {
    render(<AllSauces />);
  });

  it('renders a loader', () => {
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('renders the list properly', async () => {
    expect(await screen.findByText(/Sauces/)).toBeInTheDocument();
  });

  it('renders the <AddProtein /> component properly', async () => {
    expect(await screen.findByText(/Add Sauce/i)).toBeInTheDocument();
  });

  it('renders data properly', async () => {
    expect(await screen.findByText(/Marinara/i)).toBeInTheDocument();
  });
});
