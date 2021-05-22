import { screen } from '@testing-library/react';
import { render } from 'lib/test-utils';

import SauceAndProteinGrapesList from 'components/sauceAndProtein/SauceAndProteinGrapesList';

describe('<SauceAndProteinGrapesList />', () => {
  beforeEach(() => {
    render(<SauceAndProteinGrapesList proteinId={100} sauceId={100} />);
  });

  it('renders properly with data', async () => {
    expect(await screen.findByText('Grape Matches')).toBeInTheDocument();
    expect(await screen.findByText(/Cabernet Sauvignon/i)).toBeInTheDocument();
  });
});
