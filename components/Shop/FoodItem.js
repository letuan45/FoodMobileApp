import React, { useEffect } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import COLORS from "../../consts/colors";
import AddToCartButton from "../UI/Buttons/AddToCartButton";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store";
import { addToCart } from "../../services/CartService";
import ShowToast from "../../utils/ShowToast";
import { Rating } from "react-native-ratings";

const { width } = Dimensions.get("screen");
const itemWidth = width / 2 - 20;

const FoodItem = ({ item, navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const itemId = item["id_item"];
  const price = Number(item.price).toLocaleString("en");
  const { addToCartRes, addToCartErr, addToCartIsLoading, callAddToCart } =
    addToCart(itemId);

  useEffect(() => {
    if (addToCartRes) {
      ShowToast(addToCartRes.message);
      dispatch(cartActions.addTocart({ ...item, amount: 1 }));
    } else if (addToCartErr) {
      ShowToast(addToCartErr.data.message);
    }
  }, [addToCartRes, addToCartErr]);

  const addToCartHandler = () => {
    if (!user) {
      ShowToast("Bạn phải đăng nhập để tương tác!");
      return;
    }
    callAddToCart(1); //Amount: 1
  };

  const toDetailHandler = () => {
    navigation.navigate("DetailScreen", itemId);
  };

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
          <View style={styles.ratingWrapper}>
            <Rating
              type="custom"
              ratingCount={5}
              imageSize={24}
              startingValue={item.rating ? item.rating : 0}
              ratingColor={COLORS.red}
              ratingBackgroundColor={COLORS.grey}
              tintColor={COLORS.fadeYellow}
              readonly
            />
          </View>

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
          <AddToCartButton
            onPress={addToCartHandler}
            isLoading={addToCartIsLoading}
          />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "column",
    height: 208,
    width: itemWidth,
    marginHorizontal: 10,
    marginBottom: 40,
    borderRadius: 15,
    marginTop: 55,
    elevation: 8,
    backgroundColor: COLORS.fadeYellow,
  },
  imageContainer: {
    alignItems: "center",
    position: "absolute",
    top: -85,
  },
  image: {
    width: 180,
    height: 180,
  },
  discription: {
    marginTop: 85,
    paddingHorizontal: 14,
  },
  btnWrapper: {
    top: -30,
    position: "absolute",
    right: 0,
  },
  ratingWrapper: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginVertical: 4
  }
});

export default React.memo(FoodItem);
