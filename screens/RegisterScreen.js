import React, { Fragment } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import FormContainer from "../components/UI/Interactors/FormContainer";
import { Formik } from "formik";
import CustomTextInput from "../components/UI/Inputs/CustomTextInput";
import { RegisterSchema } from "../utils/validation";
import CustomLongInput from "../components/UI/Inputs/CustomLongInput";
import PrimaryButton from "../components/UI/Buttons/PrimaryButton";

const initialLoginValues = {
  username: "",
  password: "",
  rePassword: "",
  email: "",
  name: "",
  phone: "",
  address: "",
};

const RegisterScreen = ({ navigation }) => {
  const handleSubmitRegister = (values) => {
    navigation.navigate("LoginSuccessScreen");
    console.log(values);
  };

  return (
    <FormContainer header="Đăng ký" navigation={navigation} hasBackButton>
      <View>
        <View style={styles.scrollViewWrapper}>
          <ScrollView indicatorStyle="primary">
            <Formik
              initialValues={initialLoginValues}
              validationSchema={RegisterSchema}
              onSubmit={handleSubmitRegister}
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
                    onChangeText={handleChange("username")}
                    onBlur={handleBlur("username")}
                    value={values.username}
                    errorMessage={
                      errors.username && touched.username
                        ? errors.username
                        : null
                    }
                  />
                  <CustomTextInput
                    mode="outlined"
                    label="Mật khẩu"
                    placeholder="Nhập mật khẩu"
                    rightIconName="visibility"
                    password
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    errorMessage={
                      errors.password && touched.password
                        ? errors.password
                        : null
                    }
                  />
                  <CustomTextInput
                    mode="outlined"
                    label="Mật khẩu (nhập lại)"
                    placeholder="Nhập lại mật khẩu"
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
                    label="Họ và tên"
                    placeholder="Nhập họ và tên"
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    value={values.name}
                    errorMessage={
                      errors.name && touched.name ? errors.name : null
                    }
                  />
                  <CustomTextInput
                    mode="outlined"
                    label="Email"
                    placeholder="Nhập email"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    errorMessage={
                      errors.email && touched.email ? errors.email : null
                    }
                  />
                  <CustomTextInput
                    mode="outlined"
                    label="Số điện thoại"
                    placeholder="Nhập số điện thoại"
                    onChangeText={handleChange("phone")}
                    onBlur={handleBlur("phone")}
                    value={values.phone}
                    errorMessage={
                      errors.phone && touched.phone ? errors.phone : null
                    }
                  />
                  <CustomLongInput
                    mode="outlined"
                    label="Địa chỉ"
                    placeholder="Nhập Địa chỉ"
                    onChangeText={handleChange("address")}
                    onBlur={handleBlur("address")}
                    value={values.address}
                    errorMessage={
                      errors.address && touched.address ? errors.address : null
                    }
                  />
                  <View style={{ height: 200 }} />
                  <View style={styles.btnGroup}></View>
                  <View style={styles.btnWrapper}>
                    <PrimaryButton
                      title="Xác nhận đăng ký"
                      onPress={handleSubmit}
                    />
                  </View>
                </Fragment>
              )}
            </Formik>
          </ScrollView>
        </View>
      </View>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  scrollViewWrapper: {
    height: 600,
  },
  btnWrapper: {
    position: "absolute",
    width: "100%",
    bottom: 100,
    zIndex: 1,
  },
});

export default RegisterScreen;
