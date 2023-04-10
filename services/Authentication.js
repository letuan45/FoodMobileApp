import useAxiosFunction from "../hooks/useAxiosFunction";
import httpClient from "../utils/axiosInstance";

const LoginURL = "account/login";
const LogoutURL = "account/logout";

export const LoginAuth = () => {
  const {
    response: loginResponse,
    error: loginError,
    loading: loginIsLoading,
    axiosFetch: axiosLogin,
  } = useAxiosFunction();

  const callLogin = (values) => {
    axiosLogin({
      axiosInstance: httpClient,
      method: "POST",
      url: LoginURL,
      requestConfig: {
        data: values,
      },
    });
  };

  return { loginResponse, loginError, loginIsLoading, callLogin };
};

export const LogoutAuth = () => {
  const {
    response: logoutResponse,
    error: logoutError,
    loading: logoutIsLoading,
    axiosFetch: axiosLogout,
  } = useAxiosFunction();

  const callLogout = () => {
    axiosLogout({
      axiosInstance: httpClient,
      method: "GET",
      url: LogoutURL,
    });
  };

  return { logoutResponse, logoutError, logoutIsLoading, callLogout };
};
