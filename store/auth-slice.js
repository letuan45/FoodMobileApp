import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storeStringData } from "../services/useAsyncStorage";
import { removeData } from "../services/useAsyncStorage";

//lưu token và thông tin user
const innitialAuth = {
  token: "",
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: innitialAuth,
  reducers: {
    login(state, action) {
      const token = action.payload.token;
      const exprirationTime = action.payload.exprirationTime;

      state.token = token;
      state.user = action.payload.user;

      storeStringData("token", token);

      //AsyncStorage.setItem("token", token.toString());
      AsyncStorage.setItem("expiredTime", exprirationTime.toString());
      AsyncStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout(state) {
      state.token = "";
      state.user = null;

      const clearAsyncStorage = async () => {
        await removeData("token");
        await removeData("user");
        await removeData("expiredTime");
      }
      clearAsyncStorage();
    },
    //UX
    applyData(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
  },
});

export default authSlice;
