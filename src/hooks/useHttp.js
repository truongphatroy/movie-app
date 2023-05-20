/* Create custom Hook for call API*/

import { useState, useEffect, useCallback } from "react";

function useHttp(url) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // useCallback to memorize fetchAPI function
  const fetchAPI = useCallback(async () => {
    try {
      // prevent invalid url
      if (url.includes("undefined")) {
        return;
      }
      setIsLoading(true);
      setError(null);
      if (!url) {
        setData([]);
        setIsLoading(false);
        setError(null);
        return;
      }
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const dataJson = await response.json();

      setData(dataJson);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchAPI();
  }, [fetchAPI]);

  return {
    data,
    isLoading,
    error,
  };
}

export default useHttp;
