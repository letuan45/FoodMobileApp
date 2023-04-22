import httpClient from "../utils/axiosInstance";
import useAxiosFunction from "../hooks/useAxiosFunction";

const registerURL = "/account/create";

export const register = () => {
  const {
    response: registerResponse,
    error: registerError,
    loading: registerIsLoading,
    axiosFetch: callAxiosRegister,
  } = useAxiosFunction();

  const callRegister = (data) => {
    callAxiosRegister({
      axiosInstance: httpClient,
      method: "POST",
      url: registerURL,
      requestConfig: { data: data },
    });
  };

  return { registerResponse, registerError, registerIsLoading, callRegister };
};
