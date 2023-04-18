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

export const reviewProduct = () => {
  const {
    response: reviewResponse,
    error: reviewError,
    loading: reviewIsLoading,
    axiosFetch: callAxiosReview,
  } = useAxiosFunction();

  const callReview = ({ productId, reviewScore, comment, orderId }) => {
    callAxiosReview({
      axiosInstance: httpClient,
      url: `/reviews/${productId}`,
      method: "POST",
      requestConfig: {
        data: {
          rating: reviewScore,
          comment: comment,
        },
        params: {
          id_order: orderId,
        },
      },
    });
  };

  return { reviewResponse, reviewError, reviewIsLoading, callReview };
};
