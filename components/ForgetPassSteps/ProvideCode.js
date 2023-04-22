import React, { Fragment, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import COLORS from "../../consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Formik } from "formik";
import CustomTextInput from "../UI/Inputs/CustomTextInput";
import PrimaryButton from "../UI/Buttons/PrimaryButton";
import * as Yup from "yup";
import { provideVerifyCode } from "../../services/ForgetPassService";
import ShowToast from "../../utils/ShowToast";

const Schema = Yup.object().shape({
  verifyCode: Yup.string().required("Hãy nhập mã xác nhận!"),
});

const initialValues = {
  verifyCode: "",
};

const ProvideCode = ({ onToNextStep, username }) => {
  const {
    provideVerifyResponse,
    provideVerifyError,
    provideVerifyIsLoading,
    callProvideVerify,
  } = provideVerifyCode();

  useEffect(() => {
    if (provideVerifyResponse) {
      onToNextStep();
    } else if (provideVerifyError) {
      ShowToast(provideVerifyError.data.message);
    }
  }, [provideVerifyResponse, provideVerifyError]);

  const submitHandler = (values) => {
    callProvideVerify({ username: username, verifyID: values.verifyCode });
    //onToNextStep();
  };

  return (
    <View style={styles.container}>
      <View style={styles.stepHeaderContainer}>
        <Text style={{ color: COLORS.primary, ...styles.stepHeader }}>
          Bước 2:{" "}
        </Text>
        <Text style={styles.stepHeader}>Cung cấp mã xác nhận</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <View style={styles.iconContainer}>
          <Icon name="mail" size={64} color={COLORS.primaryDark} />
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
              label="Mã xác nhận"
              keyboardType="numeric"
              placeholder="Nhập mã xác nhận"
              leftIconName="vpn-key"
              onChangeText={handleChange("verifyCode")}
              onBlur={handleBlur("verifyCode")}
              value={values.verifyCode}
              errorMessage={
                errors.verifyCode && touched.verifyCode
                  ? errors.verifyCode
                  : null
              }
            />
            <View style={styles.btnGroup}>
              <PrimaryButton
                isLoading={provideVerifyIsLoading}
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

export default ProvideCode;
