import { Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import COLORS from "../../../consts/colors";

const PrimaryButton = ({ title, noOpacity, isLoading, onPress = () => {} }) => {
  return (
    <TouchableOpacity activeOpacity={noOpacity ? 1 : 0.8} onPress={onPress}>
      <View style={styles.btnContainer}>
        <Text style={styles.btnContent}>
          {isLoading ? (
            <ActivityIndicator animating={true} color={COLORS.white} />
          ) : (
            title
          )}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: COLORS.primaryDark,
    height: 60,
    borderRadius: 30,
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

export default PrimaryButton;
