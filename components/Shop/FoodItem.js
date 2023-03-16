import React from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import COLORS from "../../consts/colors";
import AddToCartButton from "../UI/AddToCartButton";

const { width } = Dimensions.get("screen");
const itemWidth = width / 2 - 20;

const FoodItem = ({ item, navigation }) => {
  const itemId = item["id_item"];
  const price = Number(item.price).toLocaleString("en");

  const addToCartHandler = () => {
    console.log("add to cart");
  };

  const toDetailHandler = () => {
    navigation.navigate("DetailScreen", itemId);
  }

  return (
    <Pressable onPress={toDetailHandler}>
      <View style={styles.item}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: item.image }} />
        </View>
        <View style={styles.discription}>
          <Text
            style={{ fontSize: 20, fontWeight: 600 }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.name}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontStyle: "italic",
              color: COLORS.greyDark,
            }}
          >
            Còn: {item.quantity}
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: COLORS.primaryDark,
            }}
          >
            {price} VND
          </Text>
        </View>
        <View style={styles.btnWrapper}>
          <AddToCartButton onPress={addToCartHandler} />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "column",
    height: 180,
    width: itemWidth,
    marginHorizontal: 10,
    marginBottom: 20,
    borderRadius: 15,
    marginTop: 50,
    elevation: 8,
    backgroundColor: COLORS.fadeYellow,
  },
  imageContainer: {
    alignItems: "center",
    position: "absolute",
    top: -70,
  },
  image: {
    width: 180,
    height: 180,
  },
  discription: {
    marginTop: 85,
    paddingHorizontal: 20,
  },
  btnWrapper: {
    top: -30,
    position: "absolute",
    right: 0,
  },
});

export default FoodItem;
