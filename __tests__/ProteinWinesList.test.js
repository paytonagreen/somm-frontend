import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { theme } from '../pages/AppStyles';

import WinesList from '../components/proteins/ProteinWinesList';

describe('<WineList />', () => {
    beforeEach(() => {
        render(
            <ThemeProvider theme={theme}>
                <WinesList id={55}/>
            </ThemeProvider>
        )
    })

    it('renders a loader', () => {
        expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    })

    it('renders properly with data', async () => {
        await waitForElementToBeRemoved(screen.getByText(/Loading/i))
        expect(screen.getByText('Wine Matches')).toBeInTheDocument();
    })
});
