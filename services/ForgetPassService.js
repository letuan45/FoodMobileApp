import httpClient from "../utils/axiosInstance";
import useAxiosFunction from "../hooks/useAxiosFunction";

const provideUsernameURL = "/account/forgotpassword";
const provideVerifyCodeURL = "/account/forgotpassword/verify";
const changePasswordsURL = "account/forgotpassword/verify/success";

export const provideUsername = () => {
  const {
    response: provideResponse,
    error: provideError,
    loading: provideIsLoading,
    axiosFetch: callAxiosProvide,
  } = useAxiosFunction();

  const callProvideUsername = (data) => {
    callAxiosProvide({
      axiosInstance: httpClient,
      method: "POST",
      url: provideUsernameURL,
      requestConfig: { data: data },
    });
  };

  return {
    provideResponse,
    provideError,
    provideIsLoading,
    callProvideUsername,
  };
};

export const provideVerifyCode = () => {
  const {
    response: provideVerifyResponse,
    error: provideVerifyError,
    loading: provideVerifyIsLoading,
    axiosFetch: callAxiosProvideVerify,
  } = useAxiosFunction();

  const callProvideVerify = (data) => {
    callAxiosProvideVerify({
      axiosInstance: httpClient,
      method: "POST",
      url: provideVerifyCodeURL,
      requestConfig: { data: data },
    });
  };

  return {
    provideVerifyResponse,
    provideVerifyError,
    provideVerifyIsLoading,
    callProvideVerify,
  };
};

export const changePassword = () => {
  const {
    response: changePasswordResponse,
    error: changePasswordError,
    loading: changePasswordIsLoading,
    axiosFetch: callAxiosChangePassword,
  } = useAxiosFunction();

  const callChangePassword = (data) => {
    callAxiosChangePassword({
      axiosInstance: httpClient,
      method: "POST",
      url: changePasswordsURL,
      requestConfig: { data: data },
    });
  };

  return {
    changePasswordResponse,
    changePasswordError,
    changePasswordIsLoading,
    callChangePassword,
  };
};


