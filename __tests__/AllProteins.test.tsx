import { screen } from '@testing-library/react';

import { render } from 'lib/test-utils';

import AllProteins from 'components/proteins/AllProteins';

describe('<AllProteins />', () => {
  beforeEach(() => {
    render(<AllProteins />);
  });

  it('renders a loader', () => {
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('renders the list properly', async () => {
    expect(await screen.findByText(/Proteins/)).toBeInTheDocument();
  });

  it('renders the <AddProtein /> component properly', async () => {
    expect(await screen.findByText(/Add Protein/i)).toBeInTheDocument();
  });

  it('renders data properly', async () => {
    expect(await screen.findByText(/Beef/i)).toBeInTheDocument();
  });
});
