/**
 * Set api & headers based on NODE_ENV
 */

let api, headers;

if (process.env.NODE_ENV === 'development') {
  api = 'http://127.0.0.1:7777';
  headers = {
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Content-Type': 'application/json',
  };
} else if (process.env.NODE_ENV === 'production') {
  api = 'https://api.asommforyou.com';
  headers = {
    'Access-Control-Allow-Origin': 'https://www.asommforyou.com',
    'Content-Type': 'application/json',
  };
} else if (process.env.NODE_ENV === 'test') {
  api = 'http://localhost:3000/';
  headers = {};
}


export {api, headers}