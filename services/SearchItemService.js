import httpClient from "../utils/axiosInstance";
import useAxiosFunction from "../hooks/useAxiosFunction";

const searchURL = "/items";

export const searchItem = () => {
  const {
    response: searchResponse,
    error: searchError,
    loading: searchIsLoading,
    axiosFetch: callSearchAxios,
  } = useAxiosFunction();

  const callSearchItem = (searchValue) => {
    callSearchAxios({
      axiosInstance: httpClient,
      method: "GET",
      url: searchURL,
      requestConfig: {
        params: {
          name: searchValue,
        },
      },
    });
  };

  return { searchResponse, searchError, searchIsLoading, callSearchItem };
};
