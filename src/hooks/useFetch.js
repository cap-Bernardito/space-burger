import { useEffect, useState } from "react";

const useFetch = () => {
  const [data, setData] = useState();
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

        setData(result.data);

        doneFn && doneFn(result.data);
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
