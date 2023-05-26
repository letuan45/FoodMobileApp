import React, { Fragment, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import COLORS from "../consts/colors";
import { Formik } from "formik";
import CustomTextInput from "../components/UI/Inputs/CustomTextInput";
import PrimaryButton from "../components/UI/Buttons/PrimaryButton";
import { changeProfileSchema } from "../utils/validation";
import FormContainer from "../components/UI/Interactors/FormContainer";
import ShowToast from "../utils/ShowToast";
import { changeUserProfile } from "../services/UserService";

const initialLoginValues = {
  name: "",
  phone: "",
  address: "",
};

const ChangeProfileScreen = ({ navigation }) => {
  const {
    changeUserProfileRes,
    changeUserProfileErr,
    changeUserProfileIsLoading,
    callChangeProfile,
  } = changeUserProfile();

  useEffect(() => {
    console.log(changeUserProfileErr);
    if (changeUserProfileRes) {
      ShowToast(changeUserProfileRes.message + ", hãy đăng nhập lại");
      navigation.goBack();
    } else if (changeUserProfileErr) {
      ShowToast(changeUserProfileErr.data.message);
    }
  }, [changeUserProfileRes, changeUserProfileErr]);

  const handleSubmitLogin = (values) => {
    callChangeProfile(values);
  };

  return (
    <FormContainer header="Đổi thông tin" navigation={navigation} hasBackButton>
      <View>
        <Formik
          initialValues={initialLoginValues}
          validationSchema={changeProfileSchema}
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
                label="Họ và tên"
                placeholder="Nhập họ và tên"
                leftIconName="account-circle"
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
                errorMessage={errors.name && touched.name ? errors.name : null}
              />
              <CustomTextInput
                mode="outlined"
                label="Số điện thoại"
                placeholder="Nhập số điện thoại"
                leftIconName="call"
                keyboardType="numeric"
                onChangeText={handleChange("phone")}
                onBlur={handleBlur("phone")}
                value={values.phone}
                errorMessage={
                  errors.phone && touched.phone ? errors.phone : null
                }
              />
              <CustomTextInput
                mode="outlined"
                label="Địa chỉ"
                placeholder="Nhập địa chỉ"
                leftIconName="home"
                onChangeText={handleChange("address")}
                onBlur={handleBlur("address")}
                value={values.address}
                errorMessage={
                  errors.address && touched.address ? errors.address : null
                }
              />
              <View style={styles.btnGroup}>
                <View style={styles.btnWrapper}>
                  <PrimaryButton
                    isLoading={changeUserProfileIsLoading}
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

export default ChangeProfileScreen;