import httpClient from "../utils/axiosInstance";
import useAxiosFunction from "../hooks/useAxiosFunction";

const changePasswordURL = "/account/changepassword";

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
      method: "PUT",
      url: changePasswordURL,
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