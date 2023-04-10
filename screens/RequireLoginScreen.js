import React from "react";
import { SafeAreaView, StyleSheet, View, Image, Text } from "react-native";
import COLORS from "../consts/colors";
import Logo from "../components/UI/Decorations/Logo";
import PrimaryButton from "../components/UI/Buttons/PrimaryButton";

const mainLogo = require("../assets/images/i-dont-know.png");

const RequireLoginScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoWrapper}>
        <Logo />
      </View>
      <View style={styles.emoteWrapper}>
        <Image source={mainLogo} style={styles.emote} />
        <Text
          style={{
            fontSize: 20,
            paddingHorizontal: 40,
            textAlign: "center",
            color: COLORS.greyDark,
          }}
        >
          Bạn phải đăng nhập để sử dụng chức năng này!
        </Text>
        <View style={styles.btnWrapper}>
          <PrimaryButton
            title="Đến đăng nhập"
            onPress={() => {
              navigation.navigate("LoginScreen");
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  logoWrapper: {
    marginVertical: 30,
    width: "100%",
    alignItems: "center",
  },
  emoteWrapper: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginTop: -80,
  },
  emote: {
    width: 300,
    height: 300,
  },
  btnWrapper: {
    width: "100%",
    marginTop: 10,
    paddingHorizontal: 20,
  },
});

export default RequireLoginScreen;
