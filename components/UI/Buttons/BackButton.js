import { Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../../consts/colors";

const BackButton = ({ navigation }) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={navigation.goBack}>
      <View style={styles.btnContainer}>
        <Icon name="keyboard-backspace" size={28} color={COLORS.black} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: COLORS.greyLight,
    height: 50,
    width: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BackButton;
