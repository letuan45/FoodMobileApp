import { Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../../consts/colors";

const BackButton = ({ navigation, isDark}) => {
  const customStyles = {
    ...styles.btnContainer,
    backgroundColor: isDark ? COLORS.greyDark : COLORS.greyLight,
  };

  return (
    <TouchableOpacity activeOpacity={0.6} onPress={navigation.goBack}>
      <View style={customStyles}>
        <Icon name="keyboard-backspace" size={28} color={COLORS.black} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    height: 50,
    width: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BackButton;
