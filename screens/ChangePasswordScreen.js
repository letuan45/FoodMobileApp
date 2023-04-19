import React, { Fragment, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import COLORS from "../consts/colors";
import { Formik } from "formik";
import CustomTextInput from "../components/UI/Inputs/CustomTextInput";
import PrimaryButton from "../components/UI/Buttons/PrimaryButton";
import { ChangePasswordSchema } from "../utils/validation";
import FormContainer from "../components/UI/Interactors/FormContainer";

const initialLoginValues = {
  password: "",
  rePassword: "",
  newPassword: "",
};

const ChangePasswordScreen = ({ navigation }) => {
  const handleSubmitLogin = (values) => {
    // Xử lý login
    callLogin(values);
  };

  const handleToLogin = () => {
    navigation.navigate("RegisterScreen");
  };

  return (
    <FormContainer header="Đổi mật khẩu" navigation={navigation} hasBackButton>
      <View>
        <Formik
          initialValues={initialLoginValues}
          validationSchema={ChangePasswordSchema}
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
                label="Mật khẩu cũ"
                placeholder="Nhập mật khẩu cũ"
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
              <CustomTextInput
                mode="outlined"
                label="Mật khẩu cũ - 2"
                placeholder="Nhập lại mật khẩu cũ"
                leftIconName="lock"
                rightIconName="visibility"
                password
                onChangeText={handleChange("rePassword")}
                onBlur={handleBlur("rePassword")}
                value={values.rePassword}
                errorMessage={
                  errors.rePassword && touched.rePassword
                    ? errors.rePassword
                    : null
                }
              />
              <CustomTextInput
                mode="outlined"
                label="Mật khẩu mới"
                placeholder="Nhập mật khẩu mới"
                leftIconName="lock"
                rightIconName="visibility"
                password
                onChangeText={handleChange("newPassword")}
                onBlur={handleBlur("newPassword")}
                value={values.newPassword}
                errorMessage={
                  errors.newPassword && touched.newPassword
                    ? errors.newPassword
                    : null
                }
              />
              <View style={styles.btnGroup}>
                <View style={styles.btnWrapper}>
                  <PrimaryButton title="Xác nhận" onPress={handleSubmit} />
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

export default ChangePasswordScreen;
