import React from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import Logo from "../components/UI/Decorations/Logo";
import EmpyWishlist from "../components/WishList/EmpyWishlist";
import Wishlist from "../components/WishList/Wishlist";
import COLORS from "../consts/colors";
import RequireLoginScreen from "./RequireLoginScreen";
import { useSelector} from "react-redux";

const WishlistScreen = ({navigation}) => {
  const wishlistItems = useSelector((state) => state.wishList.items);
  let content;
  const user = useSelector(state => state.auth.user);

  if (!user) {
    return <RequireLoginScreen navigation={navigation} />;
  }

  if (!wishlistItems || wishlistItems.length === 0) {
    content = <EmpyWishlist />;
  } else {
    content = (
      <View>
        <Wishlist items={wishlistItems} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoWrapper}>
        <Logo />
      </View>
      <Text style={styles.wishHeader}>Danh mục yêu thích của bạn</Text>
      {content}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
    paddingHorizontal: 20,
  },
  logoWrapper: {
    marginVertical: 30,
    width: "100%",
    alignItems: "center",
  },
  wishHeader: {
    fontSize: 26,
    fontWeight: 600,
    marginBottom: 20,
  },
});

export default WishlistScreen;
