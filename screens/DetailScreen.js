import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import BackButton from "../components/UI/Buttons/BackButton";
import PrimaryButton from "../components/UI/Buttons/PrimaryButton";
import ToWishListButtom from "../components/UI/Buttons/ToWishListButton";
import COLORS from "../consts/colors";
import httpClient from "../utils/axiosInstance";
import useAxios from "../hooks/useAxios";
import LoadingSpinner from "../components/UI/Interactors/LoadingSpinner";
import { addToCart } from "../services/CartService";
import { useDispatch, useSelector } from "react-redux";
import { cartActions, wishListActions } from "../store";
import useCheckInWishlist from "../hooks/useCheckInWishlist";
import { toggleWishlistItem } from "../services/WishlistService";
import ShowToast from "../utils/ShowToast";

const QuantityControl = ({ icon, onPress = () => {} }) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.quantityControlBtn}>{icon}</View>
    </Pressable>
  );
};

const getItemURL = "/items/detail/";

const DetailScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const wishlist = useSelector((state) => state.wishList.items);
  const [amount, setAmount] = useState(1);
  const itemId = route.params;
  const { addToCartRes, addToCartErr, addToCartIsLoading, callAddToCart } =
    addToCart(itemId);
  const {
    toggleWLItemRes,
    toggleWLItemError,
    toggleWLItemIsLoading,
    callToggleWishlistItem,
  } = toggleWishlistItem();

  let isInWishlist = false;
  if (user) {
    isInWishlist = useCheckInWishlist(wishlist, itemId);
  }

  let product;
  useEffect(() => {
    if (addToCartRes) {
      ShowToast(addToCartRes.message);
      dispatch(cartActions.addTocart({ ...product, amount: +amount }));
    } else if (addToCartErr) {
      ShowToast(addToCartErr.data.message);
    }
  }, [addToCartRes, addToCartErr]);

  useEffect(() => {
    if (toggleWLItemRes) {
      ShowToast(toggleWLItemRes.message);
      dispatch(wishListActions.toggleWishListItem({ item: product }));
    } else if (toggleWLItemError) {
      ShowToast(toggleWLItemError.data.message);
    }
  }, [toggleWLItemRes, toggleWLItemError]);

  const {
    response: productRes,
    isLoading: productIsLoading,
    error: productError,
  } = useAxios({
    axiosInstance: httpClient,
    method: "GET",
    url: getItemURL + itemId,
  });

  if (productIsLoading) {
    return <LoadingSpinner />;
  } else if (productError) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 30, textAlign: "center" }}>
          {productError.data.messsage}
        </Text>
      </View>
    );
  } else {
    product = productRes[0];
  }

  //Toggle wishlist
  const toggleToWishListHandler = () => {
    if(!user) {
      ShowToast("Bạn phải đăng nhập để tương tác!");
      return;
    }
    callToggleWishlistItem(itemId);
  };

  const removeOneHandler = () => {
    if (+amount - 1 <= 0) return;
    setAmount((oldAmount) => +oldAmount - 1 + "");
  };

  const addOneHandler = () => {
    if (+amount + 1 > quantity) return;
    setAmount((oldAmount) => +oldAmount + 1 + "");
  };

  const handleQuantityChange = (newAmount) => {
    if (+newAmount > quantity || +newAmount <= 0 || newAmount === "") {
      setAmount("1");
      ShowToast("Số lượng không hợp lệ");
      return;
    }
    const filteredAmount = newAmount.replace(/[^0-9]/g, "");
    setAmount(filteredAmount);
  };

  const addToCartHandler = () => {
    if (!user) {
      ShowToast("Bạn phải đăng nhập để tương tác!");
      return;
    }
    callAddToCart(amount);
  };

  //Render vars
  const quantity = product.quantity;
  const price = Number(product.price).toLocaleString("en");
  let status = "";
  if (product.status === 0) {
    status = "Hết hàng";
  } else if (product.status === 2) {
    status = "Ngừng kinh doanh";
  } else {
    status = "Sẵn sàng";
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton navigation={navigation} />
      </View>
      <View style={styles.imageWrapper}>
        <Image
          style={styles.image}
          source={{
            uri: `${product.image}`,
          }}
        />
      </View>
      <View style={styles.detailContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.functionWrapper}>
            <ToWishListButtom
              onPress={toggleToWishListHandler}
              active={isInWishlist}
              isLoading={toggleWLItemIsLoading}
            />
            <Pressable>
              <View style={styles.seeComment}>
                <Icon name="comment" size={28} color={COLORS.white} />
              </View>
            </Pressable>
          </View>

          <Text
            style={styles.foodHeader}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {product.name}
          </Text>
          <View style={styles.status}>
            <Text style={styles.statusItem}>SL còn: {product.quantity}</Text>
            <Text style={{ marginLeft: 20, ...styles.statusItem }}>
              Trạng thái: {status}
            </Text>
          </View>
          <View style={styles.controlWrapper}>
            <View style={styles.priceWrapper}>
              <Text style={styles.price}>{price}</Text>
              <Text style={{ fontWeight: "bold" }}>VND</Text>
            </View>
            <View style={styles.quantityControlWrapper}>
              <QuantityControl
                icon={
                  <Icon name="remove" size={28} onPress={removeOneHandler} />
                }
              />
              <TextInput
                style={styles.quantityInput}
                value={amount + ""}
                keyboardType="numeric"
                onChangeText={handleQuantityChange}
              />
              <QuantityControl
                icon={<Icon name="add" size={28} onPress={addOneHandler} />}
              />
            </View>
          </View>
          <View style={styles.foodDescription}>
            <Text style={{ fontWeight: 600, ...styles.foodDescriptionText }}>
              Mô tả:{" "}
            </Text>
            <Text
              style={styles.foodDescriptionText}
              numberOfLines={4}
              ellipsizeMode="tail"
            >
              {product.description}
            </Text>
          </View>
          <Text style={styles.igrHeader}>Nguyên liệu: </Text>
          <Text style={styles.ingredients}>{product.ingredient}</Text>
          <View style={styles.typeWrapper}>
            <Text style={styles.typeHeader}>Loại món: </Text>
            <Text style={styles.typeContent}>{product["name_type"]}</Text>
            <Text style={{ ...styles.typeHeader, marginLeft: 10 }}>
              Năng lượng:{" "}
            </Text>
            <Text style={styles.typeContent}>{product["energy"]} Kcal</Text>
          </View>
          <View style={styles.spacer}></View>
        </ScrollView>
      </View>
      <View style={styles.addToCartBtn}>
        <PrimaryButton
          title="Thêm vào giỏ"
          onPress={addToCartHandler}
          isLoading={addToCartIsLoading}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: COLORS.black,
  },
  header: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  imageWrapper: {
    top: -10,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 370,
    height: 300,
  },
  detailContainer: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 30,
    paddingTop: 25,
    height: 500,
    backgroundColor: COLORS.white,
  },
  foodHeader: {
    fontSize: 35,
    marginTop: 10,
    fontWeight: "bold",
  },
  status: {
    marginTop: 5,
    flexDirection: "row",
  },
  statusItem: {
    fontSize: 16,
    color: COLORS.greyDark,
  },
  controlWrapper: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 30,
    color: COLORS.primary,
    fontWeight: "bold",
  },
  priceWrapper: {
    flexDirection: "row",
  },
  quantityControlWrapper: {
    flexDirection: "row",
  },
  quantityControlBtn: {
    backgroundColor: COLORS.greyLight,
    borderRadius: 10,
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityInput: {
    textAlign: "center",
    fontSize: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  foodDescription: {
    marginTop: 5,
  },
  foodDescriptionText: {
    fontSize: 15,
  },
  igrHeader: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 600,
  },
  ingredients: {
    fontSize: 15,
  },
  addToCartBtn: {
    position: "absolute",
    top: 750,
    width: "100%",
    paddingHorizontal: 20,
    zIndex: 10,
  },
  spacer: {
    height: 200,
    backgroundColor: COLORS.white,
  },
  typeWrapper: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  typeHeader: {
    fontSize: 16,
    fontWeight: 600,
  },
  typeContent: {
    fontSize: 16,
    color: COLORS.primaryDark,
  },
  functionWrapper: {
    flexDirection: "row",
  },
  seeComment: {
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.green,
    elevation: 8,
    marginLeft: 10
  },
});

export default DetailScreen;
