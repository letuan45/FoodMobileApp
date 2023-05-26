import * as Yup from "yup";

export const SignupSchema = Yup.object().shape({
  username: Yup.string().required("Hãy nhập tên đăng nhập của bạn!"),
  password: Yup.string().required("Hãy nhập mật khẩu của bạn!"),
});

export const RegisterSchema = Yup.object().shape({
  username: Yup.string().required("Hãy nhập tên đăng nhập của bạn!"),
  password: Yup.string().required("Hãy nhập mật khẩu của bạn!"),
  rePassword: Yup.string().required("Hãy nhập mật khẩu của bạn!"),
  phone: Yup.string().required("Hãy nhập số điện thoại của bạn!"),
  email: Yup.string().required("Hãy nhập email của bạn!"),
  name: Yup.string().required("Hãy nhập họ và tên của bạn!"),
  address: Yup.string().required("Hãy nhập địa chỉ của bạn!"),
});

export const ChangePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Hãy nhập mật khẩu cũ của bạn!"),
  newPassword: Yup.string().required("Hãy nhập mật khẩu mới của bạn!"),
  repeatPassword: Yup.string().required("Hãy nhập lại mật khẩu mới của bạn!"),
});

export const changeProfileSchema = Yup.object().shape({
  name: Yup.string().required("Hãy nhập tên!"),
  phone: Yup.string().required("Hãy nhập SĐT của bạn!"),
  address: Yup.string().required("Hãy nhập địa chỉ của bạn!"),
});