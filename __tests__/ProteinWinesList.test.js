import { screen, waitForElementToBeRemoved } from '@testing-library/react';

import { render } from '../lib/test-utils';

import ProteinWinesList from '../components/proteins/ProteinWinesList';

describe('<ProteinWineList />', () => {
  beforeEach(() => {
    render(<ProteinWinesList id={100} />);
  });

  it('renders a loader', () => {
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('renders properly with data', async () => {
    await waitForElementToBeRemoved(screen.getByText(/Loading/i));
    expect(screen.getByText('Wine Matches')).toBeInTheDocument();
  });
});
