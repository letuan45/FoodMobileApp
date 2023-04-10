import { useSelector } from "react-redux";

const useCheckInWishlist = (wishlist, idItem) => {
  return wishlist.some(({ id_item }) => idItem === id_item);
};

export default useCheckInWishlist;
