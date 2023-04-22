import React, { Fragment, useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import COLORS from "../../consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Formik } from "formik";
import CustomTextInput from "../UI/Inputs/CustomTextInput";
import PrimaryButton from "../UI/Buttons/PrimaryButton";
import * as Yup from "yup";
import { provideUsername } from "../../services/ForgetPassService";
import ShowToast from "../../utils/ShowToast";

const Schema = Yup.object().shape({
  username: Yup.string().required("Hãy nhập tên đăng nhập của bạn!"),
});

const initiaValues = {
  username: "",
};

const ProvideUsername = ({ onToNextStep }) => {
  const [username, setUsername] = useState("");
  const {
    provideResponse,
    provideError,
    provideIsLoading,
    callProvideUsername,
  } = provideUsername();

  useEffect(() => {
    if(provideResponse) {
      const payload = {
        message: provideResponse.message,
        username: username,
      };
      onToNextStep(payload.message, username);
    } else if(provideError) {
      ShowToast(provideError.data.message);
    }
  },[provideResponse, provideError, username])

  const submitHandler = (values) => {
    setUsername(values.username);
    callProvideUsername(values);
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
              <PrimaryButton
                title="Tiếp theo"
                isLoading={provideIsLoading}
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

export default ProvideUsername;
