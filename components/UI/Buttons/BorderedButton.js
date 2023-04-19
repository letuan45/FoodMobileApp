import { Pressable, Text, View } from "react-native";
import { StyleSheet } from "react-native";
import COLORS from "../../../consts/colors";

const BorderedButton = ({ title, onPress = () => {}, dark }) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.btnContainer}>
        <Text
          style={{
            color: dark ? COLORS.primary : COLORS.white,
            ...styles.btnContent,
          }}
        >
          {title}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: "transparent",
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: COLORS.primary,
    justifyContent: "center",
    alignContent: "center",
  },
  btnContent: {
    fontSize: 20,
    fontWeight: "bold",

    textAlign: "center",
  },
});

export default BorderedButton;
