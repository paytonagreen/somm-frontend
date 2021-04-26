import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { theme } from '../components/styles/AppStyles';

import SauceAndProteinWinesList from '../components/sauceAndProtein/SauceAndProteinWinesList';

describe('<SauceAndProteinWinesList />', () => {
    beforeEach(() => {
        render(
            <ThemeProvider theme={theme}>
                <SauceAndProteinWinesList proteinId={55} sauceId={100}/>
            </ThemeProvider>
        )
    })

    it('renders properly with data', async () => {
        expect(await screen.findByText('Wine Matches')).toBeInTheDocument();
    })
});
