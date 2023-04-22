import React, { Fragment, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import COLORS from "../consts/colors";
import { Formik } from "formik";
import CustomTextInput from "../components/UI/Inputs/CustomTextInput";
import PrimaryButton from "../components/UI/Buttons/PrimaryButton";
import { ChangePasswordSchema } from "../utils/validation";
import FormContainer from "../components/UI/Interactors/FormContainer";
import { changePassword } from "../services/ChangePasswordService";
import ShowToast from "../utils/ShowToast";

const initialLoginValues = {
  oldPassword: "",
  newPassword: "",
  repeatPassword: "",
};

const ChangePasswordScreen = ({ navigation }) => {
  const {
    changePasswordResponse,
    changePasswordError,
    changePasswordIsLoading,
    callChangePassword,
  } = changePassword();

  useEffect(() => {
    if (changePasswordResponse) {
      ShowToast(changePasswordResponse.message);
      navigation.goBack();
    } else if (changePasswordError) {
      ShowToast(changePasswordError.data.message);
    }
  }, [changePasswordResponse, changePasswordError]);

  console.log(changePasswordResponse);

  const handleSubmitLogin = (values) => {
    // Xử lý login
    callChangePassword(values);
    console.log(values)
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
                onChangeText={handleChange("oldPassword")}
                onBlur={handleBlur("oldPassword")}
                value={values.oldPassword}
                errorMessage={
                  errors.oldPassword && touched.oldPassword
                    ? errors.oldPassword
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
              <CustomTextInput
                mode="outlined"
                label="Mật khẩu mới (Nhập lại)"
                placeholder="Nhập lại mật khẩu mới"
                leftIconName="lock"
                rightIconName="visibility"
                password
                onChangeText={handleChange("repeatPassword")}
                onBlur={handleBlur("repeatPassword")}
                value={values.repeatPassword}
                errorMessage={
                  errors.repeatPassword && touched.repeatPassword
                    ? errors.repeatPassword
                    : null
                }
              />
              <View style={styles.btnGroup}>
                <View style={styles.btnWrapper}>
                  <PrimaryButton
                    isLoading={changePasswordIsLoading}
                    title="Xác nhận"
                    onPress={handleSubmit}
                  />
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
