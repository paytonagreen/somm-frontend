import useSWR from 'swr';
import { OneUserData, Protein, ProteinsArray, ProteinsData, Sauce, SaucesData, User, UserData, UsersData, Wine, WinesArray, WinesData } from 'types';

interface FetcherError extends Error {
  info: Promise<any>;
  status: number;
}

const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
) => {
  const res = await fetch(input, init);
  if (!res.ok) {
    const error: Partial<FetcherError> = new Error('An error occurred while fetching the data.');
    error.info = await res.json();
    error.status = res.status;
  }
  return res.json();
};

function useUsers() {
  const { data, error } = useSWR<UsersData>(`api/users`, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}

function useProteins() {
  const { data, error } = useSWR<ProteinsData>(`api/proteins`, fetcher);

  return {
    proteinData: data,
    isLoading: !error && !data,
    isError: error,
  };
}

function usePaginatedProteins(page = 1, perPage = 5) {
  const { data, error } = useSWR<ProteinsData>(
    `api/proteins?page=${page}&per_page=${perPage}`,
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}

function useWines() {
  const { data, error } = useSWR<WinesData>(`api/wines`, fetcher);

  return {
    wineData: data,
    isLoading: !error && !data,
    isError: error,
  };
}

function usePaginatedWines(page = 1, perPage = 5) {
  const { data, error } = useSWR<WinesData>(
    `api/wines?page=${page}&per_page=${perPage}`,
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}

function useSauces() {
  const { data, error } = useSWR<SaucesData>(`api/sauces`, fetcher);

  return {
    sauceData: data,
    isLoading: !error && !data,
    isError: error,
  };
}

function usePaginatedSauces(page = 1, perPage = 5) {
  const { data, error } = useSWR<SaucesData>(
    `api/sauces?page=${page}&per_page=${perPage}`,
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}

function useCurrentUser() {
  const { data, error } = useSWR<UserData>(`api/logged_in`, fetcher);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}

function useWine(id: number) {
  const { data, error } = useSWR<Wine>(`api/wines/${id}`, fetcher);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}

function useProtein(id: number) {
  const { data, error } = useSWR<Protein>(`api/proteins/${id}`, fetcher);

  return {
    protein: data,
    isLoading: !error && !data,
    isError: error,
  };
}

function useSauce(id: number) {
  const { data, error } = useSWR<Sauce>(`api/sauces/${id}`, fetcher);

  return {
    sauce: data,
    isLoading: !error && !data,
    isError: error,
  };
}

function useOneUser(id: number) {
  const { data, error } = useSWR<OneUserData>(`api/users/${id}`, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}

function useProteinWines(id: number) {
  const { data, error } = useSWR<WinesArray>(`api/proteins/${id}/wines`, fetcher);

  return {
    proteinWines: data,
    isLoading: !error && !data,
    isError: error,
  };
}

function useSauceWines(id: number) {
  const { data, error } = useSWR<WinesArray>(`api/sauces/${id}/wines`, fetcher);

  return {
    sauceWines: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export {
  useUsers,
  useProteins,
  usePaginatedProteins,
  useWines,
  usePaginatedWines,
  useSauces,
  usePaginatedSauces,
  useCurrentUser,
  useOneUser,
  useWine,
  useProtein,
  useSauce,
  useProteinWines,
  useSauceWines,
  fetcher,
};
