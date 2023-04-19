import React, { Fragment, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import COLORS from "../consts/colors";
import { Formik } from "formik";
import CustomTextInput from "../components/UI/Inputs/CustomTextInput";
import PrimaryButton from "../components/UI/Buttons/PrimaryButton";
import BorderedButton from "../components/UI/Buttons/BorderedButton";
import { SignupSchema } from "../utils/validation";
import FormContainer from "../components/UI/Interactors/FormContainer";
import { LoginAuth } from "../services/Authentication";
import useAuth from "../hooks/use-auth";
import ShowToast from "../utils/ShowToast";

const initialLoginValues = {
  username: "",
  password: "",
};

const LoginScreen = ({ navigation }) => {
  const { loginHandler } = useAuth();
  const { loginResponse, loginError, loginIsLoading, callLogin } = LoginAuth();

  const handleSubmitLogin = (values) => {
    // Xử lý login
    callLogin(values);
  };

  useEffect(() => {
    if (loginResponse) {
      ShowToast(loginResponse.message);
      const { userInfo: user, expireTime } = loginResponse;
      //Tính thời gian expired và lưu vào bộ nhớ thiết bị
      const expireTimeData = new Date(new Date().getTime() + expireTime * 1000);
      loginHandler(loginResponse.token, expireTimeData.toISOString(), {
        ...user,
      });
      navigation.navigate("Home");
    } else if (loginError) {
      ShowToast(loginError.data.message);
    }
  }, [loginResponse, loginError]);

  const handleToLogin = () => {
    navigation.navigate("RegisterScreen");
  };

  return (
    <FormContainer header="Đăng nhập" navigation={navigation} hasBackButton>
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
                    isLoading={loginIsLoading}
                  />
                </View>
                <TouchableOpacity
                  style={styles.forgetPassWrapper}
                  onPress={() => navigation.navigate("ForgetPasswordScreen")}
                >
                  <Text style={styles.forgetPassword}>Quên mật khẩu</Text>
                </TouchableOpacity>
                <View style={styles.btnWrapper}>
                  <BorderedButton title="Tới đăng ký" onPress={handleToLogin} />
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
