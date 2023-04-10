import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

import { authActions } from "../store";
import { cartActions } from "../store";
import { wishListActions } from "../store";
import { getStringData } from "../services/useAsyncStorage";
import { getObjectData } from "../services/useAsyncStorage";
import { removeData } from "../services/useAsyncStorage";

let logoutTimer;

//input: time, output: remainingTime
const calculateRemainingTime = (exprirationTime) => {
  const currentTime = new Date().getTime();
  const adjExprirationTime = new Date(exprirationTime).getTime();
  const remainingTime = adjExprirationTime - currentTime;

  return remainingTime;
};

//Lấy token và expiredTime từ localStorage
const retrieveStoredToken = async () => {
  const storedToken = await getStringData("token");
  const expiredTime = await getStringData("expiredTime");
  const userStored = await getObjectData("user");
  const remainingTime = calculateRemainingTime(expiredTime);

  if (remainingTime < 60000) {
    await removeData("token");
    await removeData("expiredTime");
    await removeData("user");
    return null;
  }

  return {
    token: storedToken,
    remainingTime: remainingTime,
    user: userStored,
  };
};

const useAuth = () => {
  const dispatch = useDispatch();

  //Hàm logout
  const logoutHandler = useCallback(() => {
    dispatch(authActions.logout());
    dispatch(cartActions.clearCart());
    dispatch(wishListActions.clearWishList());

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, [dispatch]);

  const loginHandler = useCallback(
    (token, exprirationTime, user) => {
      const payload = { token, exprirationTime, user };
      dispatch(authActions.login(payload));

      //Tính khoảng thời gian còn lại để từ khi login
      const remainingTime = calculateRemainingTime(exprirationTime);

      // Một timeout tự động gọi logout
      logoutTimer = setTimeout(logoutHandler, remainingTime);
    },
    [dispatch]
  );

  useEffect(() => {
    (async () => {
      const tokenRetrieved = await retrieveStoredToken();
      if (tokenRetrieved) {
        dispatch(
          authActions.applyData({
            token: tokenRetrieved.token,
            user: tokenRetrieved.user,
          })
        );
        //Cập nhật timer
        logoutTimer = setTimeout(logoutHandler, tokenRetrieved.remainingTime);
      }
    })();
  }, [logoutHandler, dispatch]);

  return {
    loginHandler,
    logoutHandler,
  };
};

export default useAuth;
