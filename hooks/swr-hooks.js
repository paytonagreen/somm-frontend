import useSWR from 'swr';
import { useMemo } from 'react';
import {api} from './swr-switch'

const fetcher = (...args) => fetch(...args).then((res) => res.json());
const method = 'GET';

function useProteins() {
  const { data, error } = useSWR(`${api}/proteins`, fetcher);

  return {
    proteins: data, 
    isLoading: !error && !data,
    isError: error,
  };
}
function useWines() {
  const { data, error } = useSWR(`${api}/wines`, fetcher);

  return {
    wines: data, 
    isLoading: !error && !data,
    isError: error,
  };
}

function useWine(id) {
  const {data, error } = useSWR(`${api}/wines/${id}`, fetcher);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  }
}

function useProtein(id) {
  const {data, error } = useSWR(`${api}/proteins/${id}`, fetcher);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  }
}

function useProteinWines(id) {
    const {data, error } = useSWR(`${api}/proteins/${id}/wines`)

    return {
        proteinWines: data,
        isLoading: !error && !data,
        isError: error,
    }
}

export { useProteins, useWines, useWine, useProteinWines };
