import { Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../../consts/colors";
import { ActivityIndicator } from "react-native-paper";

const ToWishListButtom = ({ onPress = () => {}, active, isLoading }) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
      <View
        style={{
          ...styles.btnContainer,
          backgroundColor: active ? COLORS.primary : COLORS.greyLight,
        }}
      >
        {isLoading ? (
          <ActivityIndicator color={COLORS.green}/>
        ) : (
          <Icon
            name="favorite"
            size={28}
            color={active ? COLORS.red : COLORS.greyDark}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ToWishListButtom;
