import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../consts/colors";
import PrimaryButton from "../UI/Buttons/PrimaryButton";

const ForgetSuccess = ({ navigation }) => {
  return (
    <View>
      <Text style={styles.header}>Thay đổi mật khẩu thành công</Text>
      <View style={styles.container}>
        <View style={styles.logo}>
          <Icon name="done" size={100} color={COLORS.green}></Icon>
        </View>
      </View>
      <PrimaryButton
        title="Quay lại đăng nhập"
        onPress={() => {
          navigation.navigate("LoginScreen");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  header: {
    fontSize: 36,
    textAlign: "center",
    fontWeight: 600,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: COLORS.greyLight,
    marginVertical: 20,
  },
});

export default ForgetSuccess;
