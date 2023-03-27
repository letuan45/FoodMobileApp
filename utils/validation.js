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
