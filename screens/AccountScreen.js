import React from "react";
import { SafeAreaView, StyleSheet, Text, View, Image, Pressable } from "react-native";
import BackButton from "../components/UI/BackButton";
import PrimaryButton from "../components/UI/PrimaryButton";
import COLORS from "../consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";

const userImage = require("../assets/icons/user.png");

const AccountScreen = ({ navigation }) => {
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
          Phan Tấn Trung
        </Text>
        <View>
          <View style={styles.infoItem}>
            <Icon name="cake" size={28} color={COLORS.green} />
            <Text style={styles.infor}>Ngày sinh: 01/01/2001</Text>
          </View>
          <View style={{ ...styles.infoItem, borderTopWidth: 0 }}>
            <Icon name="account-circle" size={28} color={COLORS.green} />
            <Text style={styles.infor}>Giới tính: Nam</Text>
          </View>
          <View style={{ ...styles.infoItem, borderTopWidth: 0 }}>
            <Icon name="mail" size={28} color={COLORS.green} />
            <Text style={styles.infor}>Email: baga@gmail.com</Text>
          </View>
          <View style={{ ...styles.infoItem, borderTopWidth: 0 }}>
            <Icon name="call" size={28} color={COLORS.green} />
            <Text style={styles.infor}>Hot-line: 017501750175</Text>
          </View>
          <View style={{ ...styles.infoItem, borderTopWidth: 0 }}>
            <Icon name="call" size={28} color={COLORS.green} />
            <Text style={styles.infor}>
              Địa chỉ: Khu 3, xã Hoàng Cương, Huyện Thanh Ba, Phú Thọ, Việt Nam
            </Text>
          </View>
          <View style={{alignItems: "center"}}>
            <Pressable style={styles.changePassBtn}>
              <Text style={{fontSize: 16}}>Đổi mật khẩu</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <View style={styles.btnWrapper}>
        <PrimaryButton title="Đăng xuất" noOpacity />
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
    paddingHorizontal: 20
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
    marginTop: 20
  }
});

export default AccountScreen;
