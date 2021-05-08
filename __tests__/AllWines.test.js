import { screen } from '@testing-library/react';

import { render } from 'lib/test-utils';

import AllWines from 'components/wines/AllWines';

describe('<AllWines />', () => {
  beforeEach(() => {
    render(<AllWines />);
  });

  it('renders a loader', () => {
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('renders the list properly', async () => {
    expect(await screen.findByText(/Wines/)).toBeInTheDocument();
  });

  it('renders the <AddProtein /> component properly', async () => {
    expect(await screen.findByText(/Add Wine/i)).toBeInTheDocument();
  });

  it('renders data properly', async () => {
    expect(await screen.findByText(/Cabernet Sauvignon/i)).toBeInTheDocument();
  });
});
