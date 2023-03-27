import React, { Fragment } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import COLORS from "../consts/colors";
import { Formik } from "formik";
import CustomTextInput from "../components/UI/CustomTextInput";
import { Dimensions } from "react-native";
import PrimaryButton from "../components/UI/PrimaryButton";
import BorderedButton from "../components/UI/BorderedButton";
import { SignupSchema } from "../utils/validation";
import FormContainer from "../components/FormContainer";

const initialLoginValues = {
  username: "",
  password: "",
};

const LoginScreen = ({ navigation }) => {
  const handleSubmitLogin = (values) => {
    console.log(values);
    navigation.navigate("Home");
  };

  const handleToLogin = () => {
    navigation.navigate("RegisterScreen");
  };

  return (
    <FormContainer header="Đăng nhập" navigation={navigation}>
      <View>
        <Formik
          initialValues={initialLoginValues}
          validationSchema={SignupSchema}
          onSubmit={handleSubmitLogin}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <Fragment>
              <CustomTextInput
                mode="outlined"
                label="Tên đăng nhập"
                placeholder="Nhập tên đăng nhập"
                leftIconName="person"
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
                errorMessage={
                  errors.username && touched.username ? errors.username : null
                }
              />
              <CustomTextInput
                mode="outlined"
                label="Mật khẩu"
                placeholder="Nhập mật khẩu"
                leftIconName="lock"
                rightIconName="visibility"
                password
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                errorMessage={
                  errors.password && touched.password ? errors.password : null
                }
              />
              <View style={styles.btnGroup}>
                <View style={styles.btnWrapper}>
                  <PrimaryButton
                    title="Đăng nhập"
                    onPress={handleSubmit}
                  />
                </View>
                <TouchableOpacity style={styles.forgetPassWrapper}>
                  <Text style={styles.forgetPassword}>Quên mật khẩu</Text>
                </TouchableOpacity>
                <View style={styles.btnWrapper}>
                  <BorderedButton title="Đăng ký" onPress={handleToLogin} />
                </View>
              </View>
            </Fragment>
          )}
        </Formik>
      </View>
    </FormContainer>
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
  btnGroup: {
    marginTop: 30,
  },
  btnWrapper: {
    marginVertical: 14,
  },
  forgetPassWrapper: {
    alignItems: "center",
  },
  forgetPassword: {
    fontSize: 18,
    textAlign: "center",
    width: 130,
    color: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.white,
  },
});

export default LoginScreen;
