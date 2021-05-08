import '@testing-library/jest-dom/extend-expect';
import { cache } from 'swr';
import { server } from './mocks/server';

require('whatwg-fetch');


beforeAll(() => server.listen());
afterEach(() => {
    server.resetHandlers();
    cache.clear();
})
afterAll(() => server.close())