import { waitFor } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import { cache } from 'swr';
import { server } from './mocks/server';

require('whatwg-fetch');


beforeAll(() => server.listen());
afterEach(async () => {
    await server.resetHandlers();
    await waitFor(() =>  cache.clear());
})
afterAll(() => server.close())