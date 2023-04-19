import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "react-native";
import COLORS from "../../consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Formik } from "formik";
import CustomTextInput from "../UI/Inputs/CustomTextInput";
import PrimaryButton from "../UI/Buttons/PrimaryButton";

const initiaValues = {
  username: "",
};

const ProvideUsername = ({ onToNextStep }) => {
  const submitHandler = (values) => {
    const payload = {
      message: "Message con cặc gì đó",
      username: values.username,
    };
    onToNextStep(payload.message, values.username);
  };

  return (
    <View style={styles.container}>
      <View style={styles.stepHeaderContainer}>
        <Text style={{ color: COLORS.primary, ...styles.stepHeader }}>
          Bước 1:{" "}
        </Text>
        <Text style={styles.stepHeader}>Cung cấp tên tài khoản</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <View style={styles.iconContainer}>
          <Icon name="person" size={74} color={COLORS.primaryDark} />
        </View>
      </View>
      <Formik
        initialValues={initiaValues}
        //   validationSchema={}
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
            <View style={styles.btnGroup}>
              <PrimaryButton title="Tiếp theo" onPress={handleSubmit} />
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
  },
  btnGroup: {
    marginTop: 30,
  },
});

export default ProvideUsername;
