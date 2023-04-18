import { Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import COLORS from "../../../consts/colors";
import { ActivityIndicator } from "react-native-paper";

const PrimaryButtonSmall = ({ title, isLoading, onPress = () => {} }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
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
    backgroundColor: COLORS.primary,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignContent: "center",
  },
  btnContent: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.white,
    textAlign: "center",
  },
});

export default PrimaryButtonSmall;
