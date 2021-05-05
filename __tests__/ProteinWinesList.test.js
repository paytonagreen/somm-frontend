import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { theme } from '../components/styles/AppStyles';

import ProteinWinesList from '../components/proteins/ProteinWinesList';

describe('<ProteinWineList />', () => {
    beforeEach(() => {
        render(
            <ThemeProvider theme={theme}>
                <ProteinWinesList id={100}/>
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
