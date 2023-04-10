import httpClient from "../utils/axiosInstance";
import useAxiosFunction from "../hooks/useAxiosFunction";
import useAxios from "../hooks/useAxios";
const getWishlistURL = "/wishlist";

export const getWishlist = () => {
  const {
    response: wishlistRes,
    error: wishlistError,
    axiosFetch: callAxiosGetWishlist,
  } = useAxiosFunction();

  const callGetWishlist = () => {
    callAxiosGetWishlist({
      axiosInstance: httpClient,
      method: "GET",
      url: getWishlistURL,
    });
  }

  return {
    wishlistRes,
    wishlistError,
    callGetWishlist,
  };
};

export const toggleWishlistItem = () => {
  const {
    response: toggleWLItemRes,
    error: toggleWLItemError,
    loading: toggleWLItemIsLoading,
    axiosFetch: callAxiosToggleWishlistItem,
  } = useAxiosFunction();

  const callToggleWishlistItem = (idItem) => {
    const URl = `/wishlist/${idItem}`;
    callAxiosToggleWishlistItem({
      axiosInstance: httpClient,
      method: "POST",
      url: URl,
    });
  };

  return {
    toggleWLItemRes,
    toggleWLItemError,
    toggleWLItemIsLoading,
    callToggleWishlistItem,
  };
};
