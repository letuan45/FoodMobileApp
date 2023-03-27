import React from "react";
import { View, StyleSheet, Text } from "react-native";
import FormContainer from "../components/FormContainer";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../consts/colors";
import PrimaryButton from "../components/UI/PrimaryButton";

const LoginSuccessScreen = ({ navigation }) => {
  return (
    <FormContainer>
      <View style={styles.container}>
        <View style={styles.roundIconContainer}>
          <Icon name="done" color={COLORS.white} size={100} />
        </View>
        <Text style={styles.header}>ĐĂNG KÝ THÀNH CÔNG</Text>
        <View style={{ width: "100%" }}>
          <PrimaryButton
            title="Quay lại đăng nhập"
            onPress={() => {
              navigation.navigate("LoginScreen");
            }}
          />
        </View>
      </View>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  roundIconContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: COLORS.green,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    marginTop: 22,
    fontSize: 26,
    fontWeight: "bold",
    color: COLORS.white,
    marginBottom: 200,
  },
});

export default LoginSuccessScreen;
