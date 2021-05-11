import useSWR from 'swr';

const fetcher = async (...args) => {
  const res = await fetch(...args);
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    error.info = await res.json();
    error.status = res.status;
  }
  return res.json();
};

function useUsers() {
  const { data, error } = useSWR(`api/users`, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}

function useProteins() {
  const { data, error } = useSWR(`api/proteins`, fetcher);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}

function usePaginatedProteins(page = 1, perPage = 5) {
  const { data, error } = useSWR(
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
  const { data, error } = useSWR(`api/wines`, fetcher);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}

function usePaginatedWines(page = 1, perPage = 5) {
  const { data, error } = useSWR(
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
  const { data, error } = useSWR(`api/sauces`, fetcher);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}

function usePaginatedSauces(page = 1, perPage = 5) {
  const { data, error } = useSWR(
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
  const { data, error } = useSWR(`api/logged_in`, fetcher);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}

function useWine(id) {
  const { data, error } = useSWR(`api/wines/${id}`, fetcher);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}

function useProtein(id) {
  const { data, error } = useSWR(`api/proteins/${id}`, fetcher);

  return {
    protein: data,
    isLoading: !error && !data,
    isError: error,
  };
}

function useSauce(id) {
  const { data, error } = useSWR(`api/sauces/${id}`, fetcher);

  return {
    sauce: data,
    isLoading: !error && !data,
    isError: error,
  };
}

function useOneUser(id) {
  const { data, error } = useSWR(`api/users/${id}`, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}

function useProteinWines(id) {
  const { data, error } = useSWR(`api/proteins/${id}/wines`, fetcher);

  return {
    proteinWines: data,
    isLoading: !error && !data,
    isError: error,
  };
}

function useSauceWines(id) {
  const { data, error } = useSWR(`api/sauces/${id}/wines`, fetcher);

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
