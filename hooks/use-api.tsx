import { useCallback, useState } from "react";

const useApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const sendRequest = useCallback(
    async (requestConfig, request, applyData = (data: any) => {}) => {
      setIsLoading(true);
      setError(null);
      try {
        if (request === "signup") {
          const response = await fetch(requestConfig.url, {
            method: requestConfig.method ? requestConfig.method : "GET",
            headers: requestConfig.headers ? requestConfig.headers : {},
            body: requestConfig.body
              ? JSON.stringify(requestConfig.body)
              : null,
          });

          if (response.status === 400 || response.status === 200) {
            const data = await response.json();
            if (response.status === 400) {
              throw new Error(data.errorMessage);
            } else {
              applyData(data.token);
            }
          } else {
            throw new Error();
          }
        } else if (request === "signin") {
          const response = await fetch(requestConfig.url, {
            method: requestConfig.method ? requestConfig.method : "GET",
            headers: requestConfig.headers ? requestConfig.headers : {},
            body: requestConfig.payload
              ? JSON.stringify(requestConfig.payload)
              : null,
          });

          if (response.status === 400 || response.status === 200) {
            const data = await response.json();
            if (response.status === 400) {
              throw new Error(data.errorMessage);
            } else {
              applyData(data.token);
            }
          // const response = await signIn(
          //   requestConfig.provider,
          //   requestConfig.payload
          // );
          // if (response.status === 401 || response.status == 200) {
          //   if (response.status === 401) {
          //     throw new Error(response.error);
          //   } else {
          //     console.log(response);
          //     applyData(response);
          //   }
          // } else {
          //   throw new Error();
          // }
          }
        }
      } catch (err) {
        setError(err.message || "Something went wrong!");
      }
      setIsLoading(false);
    },
    []
  );

  const setErrorNull = () => {
    setError(null);
  };
  return {
    sendRequest,
    isLoading,
    error,
    setErrorNull,
  };
};

export default useApi;
