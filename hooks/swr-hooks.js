import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function useProteins() {
  const { data, error } = useSWR(`api/proteins`, fetcher);

  return {
    proteins: data,
    isLoading: !error && !data,
    isError: error,
  };
}

function useWines() {
  const { data, error } = useSWR(`api/wines`, fetcher);

  return {
    wines: data,
    isLoading: !error && !data,
    isError: error,
  };
}

function useSauces() {
  const { data, error } = useSWR(`api/sauces`, fetcher);

  return {
    sauces: data,
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
  useProteins,
  useWines,
  useSauces,
  useWine,
  useProtein,
  useSauce,
  useProteinWines,
  useSauceWines,
};
