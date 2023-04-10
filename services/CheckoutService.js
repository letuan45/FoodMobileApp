import httpClient from "../utils/axiosInstance";
import useAxios from "../hooks/useAxios";
import useAxiosFunction from "../hooks/useAxiosFunction";

const getPaymentMethodsURL = "/payment_methods";
const checkoutURL = "/cart/checkout";

export const getCheckoutMethods = () => {
  const {
    response: getMethodsRes,
    isLoading: getMethodsIsLoading,
    error: getMethodsError,
  } = useAxios({
    axiosInstance: httpClient,
    method: "GET",
    url: getPaymentMethodsURL,
  });

  return { getMethodsRes, getMethodsIsLoading, getMethodsError };
};

export const checkout = () => {
  const {
    response: checkoutRes,
    error: checkoutError,
    loading: checkoutIsLoading,
    axiosFetch: callAxiosCheckout,
  } = useAxiosFunction();

  const callCheckout = (values) => {
    callAxiosCheckout({
      axiosInstance: httpClient,
      method: "POST",
      url: checkoutURL,
      requestConfig: {
        data: {
          id_payment: +(values.paymentMethod),
          description: values.description,
        },
      },
    });
  };

  return { checkoutRes, checkoutError, checkoutIsLoading, callCheckout };
};
