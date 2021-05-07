import {screen, waitForElementToBeRemoved} from '@testing-library/react';

import {render } from '../lib/test-utils';

import EditUsers from '../components/userFlow/EditUsers'

describe('<EditUsers/>', () => {
    beforeEach(() => {
        render(<EditUsers />)
    })

    it('renders properly', async () => {
        expect(await screen.findByText(/Choose User/i)).toBeInTheDocument();
    })
})