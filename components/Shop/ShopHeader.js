import React, { Fragment } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import COLORS from "../../consts/colors";
import Logo from "../UI/Decorations/Logo";
import Icon from "react-native-vector-icons/MaterialIcons";
import Categories from "../UI/Interactors/Categories";
import PrimaryButtonSmall from "../UI/Buttons/PrimaryButtonSmall";
import { useSelector } from "react-redux";
import useAuth from "../../hooks/use-auth";

import userImage from "../../assets/icons/user.png";

const ShopHeader = ({ navigation, onChangeCate, isLoading }) => {
  let headerItem;
  useAuth();
  const user = useSelector((state) => state.auth.user);
  let userName = "Khách hàng";
  if (user && user.name) {
    userName = user.name.split(" ")[user.name.split(" ").length - 1];
  }

  if (!user) {
    headerItem = (
      <View style={{ width: 120 }}>
        <PrimaryButtonSmall
          title="Đăng nhập"
          onPress={() => {
            navigation.navigate("LoginScreen");
          }}
        />
      </View>
    );
  } else {
    headerItem = (
      <Fragment>
        <Text style={{ fontSize: 28 }}>Xin chào, </Text>
        <Text style={{ fontSize: 28, fontWeight: "bold" }}>{userName}</Text>
      </Fragment>
    );
  }

  return (
    <View>
      <View style={styles.header}>
        <View>
          <Logo />
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            {headerItem}
          </View>
          <Text style={styles.headerHint}>Hãy chọn món ăn bạn muốn</Text>
        </View>
        {user && (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AccountScreen");
            }}
          >
            {!user.image && (
              <Image source={userImage} style={styles.userImage} />
            )}
            {user.image && (
              <Image source={{ uri: user.image }} style={styles.userImage} />
            )}
          </TouchableOpacity>
        )}
      </View>
      <Pressable
        style={styles.searchContainer}
        onPress={() => {
          navigation.navigate("SearchScreen");
        }}
      >
        <View>
          <Icon name="search" size={28} />
        </View>
      </Pressable>
      <Categories onChangeCate={onChangeCate} isLoading={isLoading} />
      <View style={styles.banner}>
        <Image
          style={styles.bannerImage}
          source={require("../../assets/images/h5_bn-1.png")}
        />
        <View style={styles.bannerContainer}>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerHeader}>Đặt hàng ngay</Text>
            <Text style={styles.bannerDisc}>
              Giao hàng nội thành trong vòng tối đa 1 giờ
            </Text>
            <View style={{ marginTop: 12, width: 124 }}>
              <PrimaryButtonSmall title="Đặt ngay" />
            </View>
          </View>
          <Image
            style={styles.bannerPizza}
            source={require("../../assets/images/h5_bn-2-1.png")}
          />
        </View>
        <Text style={styles.menuHeader}>Thực đơn</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  headerHint: {
    fontSize: 20,
    marginTop: 5,
    color: COLORS.grey,
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  searchContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    backgroundColor: COLORS.greyLight,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  banner: {
    marginHorizontal: 20,
  },
  bannerImage: {
    width: "100%",
    height: 180,
    borderRadius: 14,
    resizeMode: "contain",
  },
  bannerContainer: {
    borderRadius: 14,
    position: "absolute",
    top: 0,
    left: 0,
    flex: 1,
    width: "100%",
    height: "100%",
  },
  bannerContent: {
    width: "48%",
    marginHorizontal: 32,
    marginVertical: 20,
    position: "absolute",
    zIndex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  bannerPizza: {
    width: 180,
    resizeMode: "contain",
    height: 120,
    position: "absolute",
    right: 10,
    top: 36,
    zIndex: -1,
  },
  bannerHeader: {
    color: COLORS.white,
    fontSize: 26,
    fontWeight: "bold",
  },
  bannerDisc: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 600,
  },
  menuHeader: {
    fontSize: 24,
    fontWeight: 600,
    marginTop: 18,
    marginBottom: 20,
    marginHorizontal: 20,
  },
});

export default ShopHeader;
