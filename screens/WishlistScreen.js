import React from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import Logo from "../components/UI/Logo";
import EmpyWishlist from "../components/WishList/EmpyWishlist";
import Wishlist from "../components/WishList/Wishlist";
import COLORS from "../consts/colors";

const DUMMY_PRODUCTS = [
  {
    id_item: 1,
    name: "Burger Size L",
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/2-1-600x600.png",
    price: 100000,
    quantity: 20,
  },
  {
    id_item: 2,
    name: "Burger Size L",
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/2-1-600x600.png",
    price: 100000,
    quantity: 20,
  },
  {
    id_item: 3,
    name: "Burger Size L",
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/2-1-600x600.png",
    price: 100000,
    quantity: 20,
  },
  {
    id_item: 4,
    name: "Burger Size L",
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/2-1-600x600.png",
    price: 100000,
    quantity: 20,
  },
  {
    id_item: 5,
    name: "Burger Size L",
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/2-1-600x600.png",
    price: 100000,
    quantity: 20,
  },
  {
    id_item: 6,
    name: "Burger Size L",
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/2-1-600x600.png",
    price: 100000,
    quantity: 20,
  },
  {
    id_item: 7,
    name: "Burger Size L",
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/2-1-600x600.png",
    price: 100000,
    quantity: 20,
  },
  {
    id_item: 8,
    name: "Burger Size L",
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/2-1-600x600.png",
    price: 100000,
    quantity: 20,
  },
];

const WishlistScreen = () => {
  const wishlistItems = DUMMY_PRODUCTS;
  let content;

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
