import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Logo from "../components/UI/Decorations/Logo";
import COLORS from "../consts/colors";
import ProvideUsername from "../components/ForgetPassSteps/ProvideUsername";
import BorderedButton from "../components/UI/Buttons/BorderedButton";
import ProvideCode from "../components/ForgetPassSteps/ProvideCode";
import ChangePassword from "../components/ForgetPassSteps/ChangePassword";

const ForgetPasswordScreen = () => {
  const [stepIndex, setStepIndex] = useState(1);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");

  const nextStepHandler = (message = "", username = "") => {
    setMessage(message);
    if (username !== "") {
      setUsername(username);
    }
    setStepIndex((stepIndex) => stepIndex + 1);
  };

  let stepsContent;
  if (stepIndex === 1) {
    stepsContent = <ProvideUsername onToNextStep={nextStepHandler} />;
  } else if (stepIndex === 2) {
    stepsContent = <ProvideCode onToNextStep={nextStepHandler} />;
  } else {
    stepsContent = <ChangePassword onToNextStep={nextStepHandler} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo />
      </View>
      <Text style={styles.screenHeader}>Quên mật khẩu</Text>
      <Text style={styles.screenDesc}>
        Hãy cung cấp thông tin của bạn theo từng bước
      </Text>
      {message.length > 0 && <Text style={styles.message}>{message}</Text>}
      {stepsContent}
      <View style={{ marginTop: 20 }}>
        <BorderedButton title="Thoát" dark />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.white,
  },
  logoContainer: {
    alignItems: "center",
  },
  screenHeader: {
    textAlign: "center",
    marginTop: 20,
    fontWeight: 600,
    fontSize: 28,
  },
  screenDesc: {
    fontSize: 16,
    color: COLORS.greyDark,
    marginTop: 10,
    textAlign: "center",
  },
  message: {
    fontSize: 18,
    textAlign: "center",
    color: COLORS.green,
  },
});

export default ForgetPasswordScreen;
