import httpClient from "../utils/axiosInstance";
import useAxios from "../hooks/useAxios";
import useAxiosFunction from "../hooks/useAxiosFunction";

export const getProductsReviews = (productId) => {
  const {
    response: reviewRes,
    isLoading: reviewIsLoading,
    error: reviewErr,
  } = useAxios({
    axiosInstance: httpClient,
    url: `/reviews/${productId}`,
    method: "GET",
  });

  return { reviewRes, reviewIsLoading, reviewErr };
};
