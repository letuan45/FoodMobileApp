import httpClient from "../utils/axiosInstance";
import useAxiosFunction from "../hooks/useAxiosFunction";

const changeAvatarURL = "/account/avatar";
const changeProfileURL = "/account/updateprofile";

export const changeAvatar = () => {
  const {
    response: changeAvatarResponse,
    error: changeAvatarError,
    loading: changeAvatarIsLoading,
    axiosFetch: changeAvatarAction,
  } = useAxiosFunction();

  const callReview = ({ imageURL }) => {
    changeAvatarAction({
      axiosInstance: httpClient,
      url: changeAvatarURL,
      method: "POST",
      requestConfig: {
        data: {
          image: imageURL ? imageURL : "",
        },
      },
    });
  };

  return {
    changeAvatarResponse,
    changeAvatarError,
    changeAvatarIsLoading,
    callReview,
  };
};

export const changeUserProfile = () => {
    const {
      response: changeUserProfileRes,
      error: changeUserProfileErr,
      loading: changeUserProfileIsLoading,
      axiosFetch: callChangeUserProfile,
    } = useAxiosFunction();

    const callChangeProfile = (data) => {
      callChangeUserProfile({
        axiosInstance: httpClient,
        method: "PUT",
        url: changeProfileURL,
        requestConfig: { data: data },
      });
    };

    return {
      changeUserProfileRes,
      changeUserProfileErr,
      changeUserProfileIsLoading,
      callChangeProfile,
    };
}
