import { render as testingLibraryRender } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { SWRConfig } from 'swr';

import { server, rest } from 'mocks/server';

import { theme } from 'components/styles/AppStyles';
import { User } from 'types';

/**
 * MOCK DATA
 */

const regUser = {
  username: 'coolguy',
  is_admin: false,
  id: 1,
  password: 'password',
  account_id: 1,
};

const adminUser = {
  username: 'realcoolguy',
  is_admin: true,
  id: 2,
  password: 'password',
  account_id: 1,
};

const mockWine = {
  id: 100,
  name: 'Cabernet Sauvignon',
  wine_description: 'An absolute classic',
};

const mockWine2 = {
  id: 101,
  name: 'Beaujolais',
  wine_description: 'An absolute classic',
};

const mockWine3 = {
  id: 102,
  name: 'Pinot Noir',
  wine_description: 'An absolute classic',
};

const mockWine4 = {
  id: 103,
  name: 'Riesling',
  wine_description: 'Sharply Delicious',
};

const mockWine5 = {
  id: 104,
  name: 'Sauvignon Blanc',
  wine_description: 'V Good',
};

const mockWine6 = {
  id: 105,
  name: 'Gewürztraminer',
  wine_description: 'V Good',
};

const mockProtein = {
  id: 100,
  name: 'Beef',
};

const mockSauce = {
  id: 100,
  name: 'Marinara',
};

/**
 * Test functions
 */

// useServerUser mocks a server response to GET 'api/logged_in' with the desired 'user'
const useServerUser = (user: User) => {
  server.use(
    rest.get('*/logged_in', async (req, res, ctx) => {
      return res.once(ctx.json({ logged_in: false, user: user }));
    })
  );
};

// Passes Providers to @testing-library's render, re-exports to tests

const render = (children: JSX.Element) => {
  testingLibraryRender(
    <SWRConfig value={{ dedupingInterval: 0 }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </SWRConfig>
  );
};

export {
  regUser,
  adminUser,
  mockWine,
  mockWine2,
  mockWine3,
  mockWine4,
  mockWine5,
  mockWine6,
  mockProtein,
  mockSauce,
  useServerUser,
  render,
};
