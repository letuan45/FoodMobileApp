import React from "react";
import {
  SafeAreaView,
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Text,
} from "react-native";
import COLORS from "../consts/colors";
import Logo from "../components/UI/Logo";
import BackButton from "./UI/BackButton";

const FormContainer = (props) => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      {props.hasBackButton && (
        <View style={styles.backBtnContainer}>
          <BackButton navigation={props.navigation} />
        </View>
      )}
      <View style={styles.bgContainer}>
        <ImageBackground
          style={styles.image}
          source={require("../assets/images/background_2.jpg")}
        >
          <View style={styles.backDrop} />
          <View style={styles.contentContainer}>
            <View style={styles.logoWrapper}>
              <Logo />
            </View>
            <Text style={styles.formHeader}>{props.header}</Text>
            {props.children}
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  bgContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height + 50,
  },
  backDrop: {
    flex: 1,
    backgroundColor: COLORS.black,
    opacity: 0.75,
  },
  contentContainer: {
    zIndex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
    paddingHorizontal: 20,
  },
  logoWrapper: {
    marginTop: 50,
    width: "100%",
    alignItems: "center",
  },
  formHeader: {
    fontSize: 40,
    fontWeight: "bold",
    color: COLORS.primary,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  backBtnContainer: {
    marginTop: 20,
    marginLeft: 20,
    position: "absolute",
    zIndex: 2,
  },
});

export default FormContainer;
