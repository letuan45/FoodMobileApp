import httpClient from "../utils/axiosInstance";
import useAxiosFunction from "../hooks/useAxiosFunction";
import useAxios from "../hooks/useAxios";
const getCartUrl = "/cart";

export const getCart = () => {
  const {
    response: getCartRes,
    error: getCartErr,
    loading: getCartIsLoading,
    axiosFetch: callAxiosGetCart,
  } = useAxiosFunction();

  const callGetCart = () => {
    callAxiosGetCart({
      axiosInstance: httpClient,
      method: "GET",
      url: getCartUrl,
    });
  };

  return { getCartRes, getCartErr, getCartIsLoading, callGetCart };
};

export const addToCart = (idItem) => {
  const URL = `/cart/add/${idItem}`;

  const {
    response: addToCartRes,
    error: addToCartErr,
    isLoading: addToCartIsLoading,
    axiosFetch: callAxiosAddToCart,
  } = useAxiosFunction();

  const callAddToCart = (amount = 1) => {
    callAxiosAddToCart({
      axiosInstance: httpClient,
      method: "POST",
      url: URL,
      requestConfig: {
        data: { quantity: amount },
      },
    });
  };

  return { addToCartRes, addToCartErr, addToCartIsLoading, callAddToCart };
};

export const increaseCartItem = (idItem) => {
  const URL = `/cart/increase/${idItem}`;

  const {
    response: increaseCartItemRes,
    error: increaseCartItemErr,
    axiosFetch: callAxiosIncreaseCartItem,
  } = useAxiosFunction();

  const callIncreaseCartItem = () => {
    callAxiosIncreaseCartItem({
      axiosInstance: httpClient,
      method: "POST",
      url: URL,
    });
  };

  return { increaseCartItemRes, increaseCartItemErr, callIncreaseCartItem };
};

export const decreaseCartItem = (idItem) => {
  const URL = `/cart/decrease/${idItem}`;

  const {
    response: decreaseCartItemRes,
    error: decreaseCartItemErr,
    axiosFetch: callAxiosDecreaseCartItem,
  } = useAxiosFunction();

  const callDecreaseCartItem = () => {
    callAxiosDecreaseCartItem({
      axiosInstance: httpClient,
      method: "POST",
      url: URL,
    });
  };

  return { decreaseCartItemRes, decreaseCartItemErr, callDecreaseCartItem };
};

export const updateCartItem = (idItem) => {
  const URL = `/cart/update/${idItem}`;

  const {
    response: updateCartItemRes,
    error: updateCartItemErr,
    axiosFetch: callAxiosUpdateCartItem,
  } = useAxiosFunction();

  const callUpdateCartItem = (amount) => {
    callAxiosUpdateCartItem({
      axiosInstance: httpClient,
      method: "POST",
      url: URL,
      requestConfig: {
        data: {
          quantity: amount,
        },
      },
    });
  };

  return { updateCartItemRes, updateCartItemErr, callUpdateCartItem };
};

export const removeCartItem = () => {
  const {
    response: removeCartItemRes,
    error: removeCartItemErr,
    axiosFetch: callAxiosRemoveCartItem,
  } = useAxiosFunction();

  const callRemoveCartItem = (idItem) => {
    const URL = `/cart/remove/${idItem}`;
    callAxiosRemoveCartItem({
      axiosInstance: httpClient,
      method: "DELETE",
      url: URL,
    });
  };

  return { removeCartItemRes, removeCartItemErr, callRemoveCartItem };
};
