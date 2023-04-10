import React from "react";
import { View, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import COLORS from "../../../consts/colors";

const LoadingSpinner = ({size}) => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size={size ? size : "large"} animating={true} color={COLORS.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
});

export default LoadingSpinner;
