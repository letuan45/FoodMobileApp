import React from "react";
import { FlatList, View, StyleSheet, Image, Text } from "react-native";
import COLORS from "../../consts/colors";
import ToWishListButton from "../UI/ToWishListButton";

const WishlistItem = ({ item }) => {
  const price = Number(item.price).toLocaleString("en");

  const handleToWishList = () => {};

  return (
    <View style={styles.itemWrapper}>
      <Image style={styles.itemImage} source={{ uri: item.image }} />
      <View style={styles.contentWrapper}>
        <Text style={styles.itemName} numberOfLines={1} ellipsizeMode="tail">
          {item.name}
        </Text>
        <Text style={styles.itemPrice}>{price}VND</Text>
      </View>
      <View style={styles.btnWrapper}>
        <ToWishListButton onPress={handleToWishList} />
      </View>
    </View>
  );
};

const Wishlist = ({ items }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={({ item }) => <WishlistItem item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 608,
  },
  itemWrapper: {
    elevation: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 12,
    backgroundColor: COLORS.fadeYellow,
    flexDirection: "row",
    alignItems: "center",
  },
  itemImage: {
    width: 100,
    height: 100,
  },
  contentWrapper: {
    flex: 1,
  },
  itemName: {
    fontSize: 20,
    fontWeight: 500,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.green,
  },
  btnWrapper: {
    marginRight: 20,
  },
});

export default Wishlist;
