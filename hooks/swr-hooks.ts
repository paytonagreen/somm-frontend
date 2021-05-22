import useSWR from 'swr';
import {
  Grape,
  GrapesArray,
  GrapesData,
  OneUserData,
  Protein,
  ProteinsData,
  Sauce,
  SaucesData,
  UserData,
  UsersData,
  Wine,
  WinesArray,
  WinesData,
} from 'types';

interface FetcherError extends Error {
  info: Promise<any>;
  status: number;
}

/******************************
 * SWR Fetch Function
 *****************************/

const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
) => {
  const res = await fetch(input, init);
  if (!res.ok) {
    const error: Partial<FetcherError> = new Error(
      'An error occurred while fetching the data.'
    );
    error.info = await res.json();
    error.status = res.status;
  }
  return res.json();
};

/*******************************
 * USERS
 *******************************/

function useUsers() {
  const { data, error } = useSWR<UsersData>(`api/users`, fetcher);

  return {
    data,
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

function useOneUser(id: number) {
  const { data, error } = useSWR<OneUserData>(`api/users/${id}`, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}

/*******************************
 * PROTEINS
 *******************************/

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

function useProtein(id: number) {
  const { data, error } = useSWR<Protein>(`api/proteins/${id}`, fetcher);

  return {
    protein: data,
    isLoading: !error && !data,
    isError: error,
  };
}

/*******************************
 * SAUCES
 *******************************/

function useSauce(id: number) {
  const { data, error } = useSWR<Sauce>(`api/sauces/${id}`, fetcher);

  return {
    sauce: data,
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

/*******************************
 * GRAPES
 *******************************/

function useGrape(id: number) {
  const { data, error } = useSWR<Grape>(`api/grapes/${id}`, fetcher);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}

function useGrapes() {
  const { data, error } = useSWR<GrapesData>(`api/grapes`, fetcher);

  return {
    grapeData: data,
    isLoading: !error && !data,
    isError: error,
  };
}

function usePaginatedGrapes(page = 1, perPage = 5) {
  const { data, error } = useSWR<GrapesData>(
    `api/grapes?page=${page}&per_page=${perPage}`,
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}

/*******************************
 * WINES
 *******************************/

function useWine(id: number) {
  const { data, error } = useSWR<Wine>(`api/wines/${id}`, fetcher);

  return {
    wine: data,
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

function useWineGrapes(id: number) {
  const { data, error } = useSWR<WinesArray>(`api/wines/${id}/grapes`, fetcher);

  return {
    wineGrapes: data,
    isLoading: !error && !data,
    isError: error,
  };
}

/*******************************
 * PROTEIN PAIRINGS
 *******************************/

function useProteinWines(id: number) {
  const { data, error } = useSWR<WinesArray>(
    `api/proteins/${id}/wines`,
    fetcher
  );

  return {
    proteinWines: data,
    isLoading: !error && !data,
    isError: error,
  };
}

function useProteinGrapes(id: number) {
  const { data, error } = useSWR<WinesArray>(
    `api/proteins/${id}/grapes`,
    fetcher
  );

  return {
    proteinGrapes: data,
    isLoading: !error && !data,
    isError: error,
  };
}

/*******************************
 * SAUCE PAIRINGS
 *******************************/

function useSauceWines(id: number) {
  const { data, error } = useSWR<WinesArray>(`api/sauces/${id}/wines`, fetcher);

  return {
    sauceWines: data,
    isLoading: !error && !data,
    isError: error,
  };
}

function useSauceGrapes(id: number) {
  const { data, error } = useSWR<GrapesArray>(
    `api/sauces/${id}/grapes`,
    fetcher
  );

  return {
    sauceGrapes: data,
    isLoading: !error && !data,
    isError: error,
  };
}

/*******************************
 * BY ACCOUNT
 *******************************/

function useAccountWines(id: number) {
  const { data, error } = useSWR<WinesArray>(
    `api/accounts/${id}/wines`,
    fetcher
  );

  return {
    accountWines: data,
    isLoading: !error && !data,
    isError: error,
  };
}

function usePaginatedAccountWines(id: number, page: number, per_page: number) {
  const { data, error } = useSWR<WinesData>(
    `api/accounts/${id}/wines?page=${page}&per_page=${per_page}`,
    fetcher
  );

  return {
    accountWines: data,
    isLoading: !error && !data,
    isError: error,
  };
}

/********************************/

export {
  useUsers,
  useProteins,
  usePaginatedProteins,
  useWines,
  usePaginatedWines,
  useGrapes,
  usePaginatedGrapes,
  useSauces,
  usePaginatedSauces,
  useCurrentUser,
  useOneUser,
  useWine,
  useGrape,
  useProtein,
  useSauce,
  useProteinWines,
  useProteinGrapes,
  useSauceWines,
  useSauceGrapes,
  useWineGrapes,
  useAccountWines,
  usePaginatedAccountWines,
  fetcher,
};
