import httpClient from "../utils/axiosInstance";
import useAxios from "../hooks/useAxios";
import useAxiosFunction from "../hooks/useAxiosFunction";

const getOrdersURL = "/orders";

export const getOrders = () => {
  const {
    response: getOrdersResponse,
    isLoading: getOrdersIsLoading,
    error: getOrdersError,
  } = useAxios({
    axiosInstance: httpClient,
    method: "GET",
    url: getOrdersURL,
  });

  return { getOrdersResponse, getOrdersError, getOrdersIsLoading };
};

export const getOrderDetail = (idOrder) => {
  const URL = `/orders/detail/${idOrder}`;
  const {
    response: getOrdersDetailResponse,
    isLoading: getOrdersDetailIsLoading,
    error: getOrdersDetailError,
    refetch: refetchOrder,
  } = useAxios({
    axiosInstance: httpClient,
    method: "GET",
    url: URL,
  });

  return {
    getOrdersDetailResponse,
    getOrdersDetailIsLoading,
    getOrdersDetailError,
    refetchOrder,
  };
};

export const cancelOrder = () => {
  const {
    response: cancelOrderRes,
    error: cancelOrderError,
    loading: cancelOrderIsLoading,
    axiosFetch: callAxiosCancelOrder,
  } = useAxiosFunction();

  const callCancelOrder = (idOrder) => {
    const URL = `/orders/cancel/${idOrder}`;
    callAxiosCancelOrder({
      axiosInstance: httpClient,
      method: "GET",
      url: URL,
    });
  };

  return {
    cancelOrderRes,
    cancelOrderError,
    cancelOrderIsLoading,
    callCancelOrder,
  };
};
