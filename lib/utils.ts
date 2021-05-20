import { Dispatch, SetStateAction } from 'react';
import { mutate } from 'swr';

import { FetchOptions } from 'types';

/**
 * Set api & headers based on NODE_ENV
 */

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

/*********************
 * Custom Fetch
 **********************/

export async function myFetch(
  url: string,
  options: FetchOptions,
  mutateString: string,
  setSuccessMessage: Dispatch<SetStateAction<string | JSX.Element>>,
  setErrorMessage: Dispatch<SetStateAction<string>>,
  successMessage: string | JSX.Element = 'You did it!'
) {
  try {
    const res = await fetch(url, options);
    const data = await res.json();
    if (!res.ok) {
      throw Error(data.message);
    } else {
      setSuccessMessage(successMessage);
      mutate(mutateString);
    }
  } catch (err) {
    setErrorMessage(err.message);
  }
}

/*************************
 * Sentence Case
 **************************/

export function sentenceCase(string: string) {
  return string.charAt(0).toUpperCase() + string.substr(1)
}
