import React, { useEffect } from "react";
import { FlatList, View, StyleSheet, Image, Text } from "react-native";
import COLORS from "../../consts/colors";
import ToWishListButton from "../UI/Buttons/ToWishListButton";
import { useDispatch } from "react-redux";
import { wishListActions } from "../../store";
import { toggleWishlistItem } from "../../services/WishlistService";
import ShowToast from "../../utils/ShowToast";

const WishlistItem = ({ item }) => {
  const dispatch = useDispatch();
  const price = Number(item.price).toLocaleString("en");
  const {
    toggleWLItemRes,
    toggleWLItemError,
    toggleWLItemIsLoading,
    callToggleWishlistItem,
  } = toggleWishlistItem();

  useEffect(() => {
    if(toggleWLItemRes) {
      ShowToast(toggleWLItemRes.message);
      console.log(item);
      dispatch(wishListActions.toggleWishListItem({item: item}));
    } else if (toggleWLItemError) {
      ShowToast(toggleWLItemError.data.message);
    }
  }, [toggleWLItemRes, toggleWLItemError]);

  

  const handleToWishList = () => {
    
    callToggleWishlistItem(item.id_item);
  };

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
        <ToWishListButton
          onPress={handleToWishList}
          active={true}
          isLoading={toggleWLItemIsLoading}
        />
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
