import useSWR from 'swr';
import {
  Dish,
  DishesData,
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

export function useUsers() {
  const { data, error } = useSWR<UsersData>(`api/users`, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useCurrentUser() {
  const { data, error } = useSWR<UserData>(`api/logged_in`, fetcher);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useOneUser(id: number) {
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

export function useProteins() {
  const { data, error } = useSWR<ProteinsData>(`api/proteins`, fetcher);

  return {
    proteinData: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function usePaginatedProteins(page = 1, perPage = 5) {
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

export function useProtein(id: number) {
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

export function useSauce(id: number) {
  const { data, error } = useSWR<Sauce>(`api/sauces/${id}`, fetcher);

  return {
    sauce: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useSauces() {
  const { data, error } = useSWR<SaucesData>(`api/sauces`, fetcher);

  return {
    sauceData: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function usePaginatedSauces(page = 1, perPage = 5) {
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

export function useGrape(id: number) {
  const { data, error } = useSWR<Grape>(`api/grapes/${id}`, fetcher);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useGrapes() {
  const { data, error } = useSWR<GrapesData>(`api/grapes`, fetcher);

  return {
    grapeData: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function usePaginatedGrapes(page = 1, perPage = 5) {
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
 * DISHES
 *******************************/

export function useDish(id: number) {
  const { data, error } = useSWR<Dish>(`api/dishes/${id}`, fetcher);

  return {
    dish: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useDishes() {
  const { data, error } = useSWR<DishesData>(`api/dishes`, fetcher);

  return {
    dishData: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function usePaginatedDishes(page = 1, perPage = 5) {
  const { data, error } = useSWR<DishesData>(
    `api/dishes?page=${page}&per_page=${perPage}`,
    fetcher
  );

  return {
    dishData: data,
    isLoading: !error && !data,
    isError: error,
  };
}

/*******************************
 * WINES
 *******************************/

export function useWine(id: number) {
  const { data, error } = useSWR<Wine>(`api/wines/${id}`, fetcher);

  return {
    wine: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useWines() {
  const { data, error } = useSWR<WinesData>(`api/wines`, fetcher);

  return {
    wineData: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function usePaginatedWines(page = 1, perPage = 5) {
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

export function useWineGrapes(id: number) {
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

export function useProteinWines(id: number) {
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

export function useProteinGrapes(id: number) {
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

export function useSauceWines(id: number) {
  const { data, error } = useSWR<WinesArray>(`api/sauces/${id}/wines`, fetcher);

  return {
    sauceWines: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useSauceGrapes(id: number) {
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

export function useAccountWines(id: number) {
  const { data, error } = useSWR<WinesData>(
    `api/accounts/${id}/wines`,
    fetcher
  );

  return {
    accountWines: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function usePaginatedAccountWines(
  id: number,
  page: number,
  per_page: number
) {
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

export function usePaginatedAccountDishes(
  id: number,
  page: number,
  per_page: number
) {
  const { data, error } = useSWR<DishesData>(
    `api/accounts/${id}/dishes?page=${page}&per_page=${per_page}`,
    fetcher
  );

  return {
    accountDishes: data,
    isLoading: !error && !data,
    isError: error,
  };
}
