import React, { Fragment, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import COLORS from "../../consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Formik } from "formik";
import CustomTextInput from "../UI/Inputs/CustomTextInput";
import PrimaryButton from "../UI/Buttons/PrimaryButton";
import * as Yup from "yup";
import { changePassword } from "../../services/ForgetPassService";
import ShowToast from "../../utils/ShowToast";

const Schema = Yup.object().shape({
  password: Yup.string().required("Hãy nhập mật khẩu mới!"),
  rePassword: Yup.string().required("Hãy nhập lại mật khẩu mới"),
});

const initialValues = {
  password: "",
  rePassword: "",
};

const ChangePassword = ({ onToNextStep, username }) => {
  const {
    changePasswordResponse,
    changePasswordError,
    changePasswordIsLoading,
    callChangePassword,
  } = changePassword();

  useEffect(() => {
    if (changePasswordResponse) {
      onToNextStep();
    } else if(changePasswordError) {
      ShowToast(changePasswordError.data.message);
    }
  }, [changePasswordResponse, changePasswordError]);

  const submitHandler = (values) => {
    const data = {
      username: username,
      password: values.password,
      repeatPassword: values.rePassword,
    };
    callChangePassword(data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.stepHeaderContainer}>
        <Text style={{ color: COLORS.primary, ...styles.stepHeader }}>
          Bước 3:{" "}
        </Text>
        <Text style={styles.stepHeader}>Hoàn tất thay đổi</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <View style={styles.iconContainer}>
          <Icon name="verified-user" size={64} color={COLORS.primaryDark} />
        </View>
      </View>
      <Formik
        initialValues={initialValues}
        validationSchema={Schema}
        onSubmit={submitHandler}
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
              light
              mode="outlined"
              label="Mật khẩu mới"
              placeholder="Nhập mật khẩu mới"
              leftIconName="lock"
              rightIconName="visibility"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              password
              errorMessage={
                errors.password && touched.password ? errors.password : null
              }
            />
            <CustomTextInput
              light
              mode="outlined"
              label="Mật khẩu mới"
              placeholder="Nhập lại mật khẩu mới"
              leftIconName="lock"
              rightIconName="visibility"
              onChangeText={handleChange("rePassword")}
              onBlur={handleBlur("rePassword")}
              value={values.rePassword}
              password
              errorMessage={
                errors.rePassword && touched.rePassword
                  ? errors.rePassword
                  : null
              }
            />
            <View style={styles.btnGroup}>
              <PrimaryButton
                isLoading={changePasswordIsLoading}
                title="Tiếp theo"
                onPress={handleSubmit}
              />
            </View>
          </Fragment>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  stepHeaderContainer: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  stepHeader: {
    fontSize: 18,
    fontWeight: 600,
  },
  iconContainer: {
    marginTop: 18,
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: COLORS.greyLight,
    marginBottom: 10,
  },
  btnGroup: {
    marginTop: 30,
  },
});

export default ChangePassword;
