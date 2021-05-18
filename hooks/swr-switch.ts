let api: String;
let headers: Headers;

const devHeaderDict = {
  'Access-Control-Allow-Origin': 'http://localhost:3000',
  'Content-Type': 'application/json',
};

const prodHeaderDict = {
  'Access-Control-Allow-Origin': 'https://www.asommforyou.com',
  'Content-Type': 'application/json',
};

const testHeaderDict = {};

if (process.env.NODE_ENV === 'development') {
  api = 'http://127.0.0.1:7777';
  headers = new Headers(devHeaderDict);
} else if (process.env.NODE_ENV === 'production') {
  api = 'https://api.asommforyou.com';
  headers = new Headers(prodHeaderDict);
} else if (process.env.NODE_ENV === 'test') {
  api = 'http://localhost:3000/';
  headers = new Headers(testHeaderDict);
}
export { api, headers };
