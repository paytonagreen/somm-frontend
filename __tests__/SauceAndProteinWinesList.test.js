import { screen } from '@testing-library/react';

import { render } from 'lib/test-utils';

import SauceAndProteinWinesList from 'components/sauceAndProtein/SauceAndProteinWinesList';

describe('<SauceAndProteinWinesList />', () => {
  beforeEach(() => {
    render(<SauceAndProteinWinesList proteinId={100} sauceId={100} />);
  });

  it('renders properly with data', async () => {
    expect(await screen.findByText('Wine Matches')).toBeInTheDocument();
  });
});
