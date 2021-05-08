import { screen } from '@testing-library/react';

import { render } from 'lib/test-utils';

import DeleteProtein from 'components/proteins/DeleteProtein';

describe('<DeleteProtein />', () => {
  beforeEach(async () => {
    render(<DeleteProtein id={100} />);
  });

  it('renders correctly', async () => {
    expect(
      await screen.findByRole('button', { name: 'Delete' })
    ).toBeInTheDocument();
  });
});
