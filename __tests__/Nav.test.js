import { screen } from '@testing-library/react';

import { render, regUser, adminUser } from '../lib/test-utils';

import Nav from '../components/page/Nav';

const regRender = () => render(<Nav currentUser={regUser} />)
const adminRender = () => render(<Nav currentUser={adminUser} />)

describe('<Nav />', () => {
  it('renders properly', async () => {
    await regRender();
    expect(
      await screen.findByRole('link', { name: /A Somm For You/i })
    ).toBeInTheDocument();
  });
});
