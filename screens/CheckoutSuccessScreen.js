import React from "react";
import { SafeAreaView, StyleSheet, Text, Image, View } from "react-native";
import COLORS from "../consts/colors";
import PrimaryButton from "../components/UI/Buttons/PrimaryButton";

const mainImage = require("../assets/images/happiness.png");

const CheckoutSuccessScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Chúng tôi đã tiếp nhận đơn hàng của bạn</Text>
      <Image source={mainImage} style={styles.image} />
      <Text style={styles.message}>
        Rất mong nhận được sự giúp đỡ của bạn trong tương lai!
      </Text>
      <View style={styles.btnContainer}>
        <PrimaryButton
          title="Tiếp tục mua sắm"
          onPress={() => {
            navigation.navigate("HomeScreen");
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  header: {
    flex: 1,
    fontSize: 26,
    fontWeight: 600,
    color: COLORS.primaryDark,
    textAlign: "center",
  },
  image: {
    width: 350,
    height: 350,
    flex: 2,
    top: -30,
  },
  message: {
    fontSize: 22,
    textAlign: "center",
    color: COLORS.greyDark,
    flex: 1,
    top: -25,
  },
  btnContainer: {
    top: -80,
    width: "100%",
  },
});

export default CheckoutSuccessScreen;
