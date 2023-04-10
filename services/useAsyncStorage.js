import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeStringData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
    console.log("Save data error");
  }
};

export const storeObjectData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
    console.log("Save data error");
  }
};

export const getStringData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      //console.log(value)
      return value;
    }
  } catch (e) {
    console.log("Get data error");
  }
};


export const getObjectData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log("Get data error");
  }
};

export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // saving error
    console.log("Remove data error");
  }
}
