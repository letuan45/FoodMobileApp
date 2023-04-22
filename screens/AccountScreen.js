import React, { useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from "react-native";
import BackButton from "../components/UI/Buttons/BackButton";
import PrimaryButton from "../components/UI/Buttons/PrimaryButton";
import COLORS from "../consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useSelector, useDispatch } from "react-redux";
import { authActions, cartActions } from "../store";
import { LogoutAuth } from "../services/Authentication";
import ShowToast from "../utils/ShowToast";

const userImage = require("../assets/icons/user.png");

const AccountScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const { logoutResponse, logoutError, logoutIsLoading, callLogout } =
    LogoutAuth();

  const handleLogout = () => {
    callLogout();
  };

  useEffect(() => {
    if (logoutResponse) {
      // Gọi dispatch cho redux
      dispatch(authActions.logout());
      dispatch(cartActions.clearCart());

      // Quay về Home và báo Toast
      ShowToast(logoutResponse.message);
      navigation.navigate("Home");
      return;
    } else if (logoutError) {
      ShowToast(logoutError.data.message);
    }
  }, [logoutResponse, logoutError]);

  if (!user) {
    navigation.navigate("Home");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backDrop} />
      <View style={styles.header}>
        <BackButton navigation={navigation} />
        <Text style={styles.headerContent}>Thông tin tài khoản</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.imageWrapper}>
          <Image source={userImage} style={styles.userImage} />
        </View>
        <Text
          style={{
            top: "-5%",
            fontSize: 20,
            textAlign: "center",
            fontWeight: 600,
          }}
        >
          {user.name}
        </Text>
        <View>
          <View style={{ ...styles.infoItem, borderTopWidth: 0 }}>
            <Icon name="account-circle" size={28} color={COLORS.green} />
            <Text style={styles.infor}>Id User: #{user.id_customer}</Text>
          </View>
          <View style={{ ...styles.infoItem, borderTopWidth: 0 }}>
            <Icon name="mail" size={28} color={COLORS.green} />
            <Text style={styles.infor}>Email: {user.email}</Text>
          </View>
          <View style={{ ...styles.infoItem, borderTopWidth: 0 }}>
            <Icon name="call" size={28} color={COLORS.green} />
            <Text style={styles.infor}>Hot-line: {user.phone}</Text>
          </View>
          <View style={{ ...styles.infoItem, borderTopWidth: 0 }}>
            <Icon name="call" size={28} color={COLORS.green} />
            <Text style={styles.infor}>{user.address}</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Pressable
              style={styles.changePassBtn}
              onPress={() => {
                navigation.navigate("ChangePasswordScreen");
              }}
            >
              <Text style={{ fontSize: 16 }}>Đổi mật khẩu</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <View style={styles.btnWrapper}>
        <PrimaryButton
          isLoading={logoutIsLoading}
          title="Đăng xuất"
          noOpacity
          onPress={handleLogout}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: COLORS.white,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginLeft: 20,
  },
  headerContent: {
    marginLeft: 10,
    fontSize: 20,
  },
  backDrop: {
    position: "absolute",
    width: "100%",
    height: "45%",
    backgroundColor: COLORS.primary,
  },
  card: {
    top: "10%",
    marginHorizontal: 20,
    backgroundColor: COLORS.white,
    elevation: 10,
    borderRadius: 8,
    height: 540,
  },
  imageWrapper: {
    alignItems: "center",
    top: -40,
  },
  userImage: {
    width: 110,
    height: 110,
  },
  btnWrapper: {
    position: "absolute",
    width: "100%",
    paddingHorizontal: 40,
    top: 660,
    left: 0,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 14,
    borderTopWidth: 2,
    borderTopColor: COLORS.greyLight,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.greyLight,
    paddingVertical: 10,
  },
  infor: {
    fontSize: 16,
    paddingHorizontal: 20,
  },
  changePassBtn: {
    marginHorizontal: 20,
    backgroundColor: "transparent",
    height: 50,
    borderWidth: 2,
    borderRadius: 30,
    borderColor: COLORS.orange,
    width: 120,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
});

export default AccountScreen;
