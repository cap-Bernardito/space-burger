import { useEffect, useState } from "react";

const useFetch = (initialData) => {
  const [data, setData] = useState(initialData);
  const [fetchFns, setFetchFns] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (typeof fetchFns === "undefined") {
      return;
    }

    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      const { getDataFn, doneFn } = fetchFns;

      try {
        const result = await getDataFn();

        setData(result);

        doneFn && doneFn(result);
      } catch (error) {
        setIsError(error);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [fetchFns]);

  return [{ data, isLoading, isError }, setFetchFns];
};

export default useFetch;
