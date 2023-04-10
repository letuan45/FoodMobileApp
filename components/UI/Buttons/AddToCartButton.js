import { Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../../consts/colors";
import { ActivityIndicator } from "react-native-paper";

const AddToCartButton = ({ onPress = () => {}, isLoading }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={styles.btnContainer}>
        {isLoading && <ActivityIndicator color={COLORS.white} size={22} />}
        {!isLoading && (
          <Icon name="add-shopping-cart" size={24} color={COLORS.white} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: COLORS.green,
    height: 40,
    width: 40,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddToCartButton;
