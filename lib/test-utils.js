import { render as testingLibraryRender } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import {SWRConfig} from 'swr';

import { theme } from 'components/styles/AppStyles';

const regUser = {
  username: 'coolguy',
  is_admin: false,
  id: 1,
};

const adminUser = {
  username: 'realcoolguy',
  is_admin: true,
  id: 2,
};

const mockWine = {
  id: 100,
  wine_name: 'Cabernet Sauvignon',
  wine_description: 'An absolute classic',
};

const mockProtein = {
  id: 100,
  protein_name: 'Beef',
};

const mockSauce = {
  id: 100,
  sauce_name: 'Marinara',
};

const render = (children) => {
  testingLibraryRender(
    <SWRConfig value={{ dedupingInterval: 0 }}>
      <ThemeProvider theme={theme}>{children} </ThemeProvider>
    </SWRConfig>
  );
};

export { regUser, adminUser, mockWine, mockProtein, mockSauce, render };
