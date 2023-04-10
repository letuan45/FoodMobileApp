import { ToastAndroid } from "react-native";

const ShowToast = (message) => {
  return ToastAndroid.showWithGravity(
    message,
    ToastAndroid.SHORT,
    ToastAndroid.CENTER
  );
};

export default ShowToast;
