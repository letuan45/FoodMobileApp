import { Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import COLORS from "../../../consts/colors";

const BorderedButton = ({ title, onPress = () => {} }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={styles.btnContainer}>
        <Text style={styles.btnContent}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: "transparent",
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: COLORS.primary,
    elevation: 4,
    justifyContent: "center",
    alignContent: "center",
  },
  btnContent: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.white,
    textAlign: "center",
  },
});

export default BorderedButton;