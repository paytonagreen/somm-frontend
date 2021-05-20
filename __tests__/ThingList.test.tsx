import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { mockWine, render } from 'lib/test-utils';

import ThingList from 'components/reusable/ThingList';

const setPage = jest.fn();

describe('<ThingList /> ', () => {
  beforeEach(() => {
    render(
      <ThingList
        title='Things'
        page={5}
        setPage={setPage}
        data={{ wines: [mockWine], total_pages: 6, total_entries: 1 }}
        specificData={[mockWine]}
      />
    );
  });

  it('renders a title', () => {
    expect(screen.getByText(/Things/i)).toBeInTheDocument();
  });

  it('calls page up properly', async () => {
    const upButton = screen.getByRole('button', { name: 'Next' });
    await userEvent.click(upButton);
    expect(setPage).toHaveBeenCalled();
    expect(setPage).toHaveBeenCalledWith(6);
  });

  it('calls page down properly', async () => {
    const downButton = screen.getByRole('button', { name: 'Previous' });
    await userEvent.click(downButton);
    expect(setPage).toHaveBeenCalled();
    expect(setPage).toHaveBeenCalledWith(4);
  });
});
