import { Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../consts/colors";

const ToWishListButtom = ({onPress = () => {} }) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
      <View style={styles.btnContainer}>
        <Icon name="favorite" size={28} color={COLORS.red} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: COLORS.primary,
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ToWishListButtom;