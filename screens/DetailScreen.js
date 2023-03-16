import React, { useState } from "react";
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
import BackButton from "../components/UI/BackButton";
import PrimaryButton from "../components/UI/PrimaryButton";
import ToWishListButtom from "../components/UI/ToWishListButton";
import COLORS from "../consts/colors";

const QuantityControl = ({ icon, onPress = () => {} }) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.quantityControlBtn}>{icon}</View>
    </Pressable>
  );
};

const DetailScreen = ({ navigation, route }) => {
  const [amount, setAmount] = useState(1);
  const quantity = 12;
  const itemId = route.params;
  const price = Number(100000).toLocaleString("en");

  const addToWishListHandler = () => {
    console.log("to wish list");
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
      return;
    }
    const filteredAmount = newAmount.replace(/[^0-9]/g, "");
    setAmount(filteredAmount);
  };

  const addToCartHandler = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton navigation={navigation} />
      </View>
      <View style={styles.imageWrapper}>
        <Image
          style={styles.image}
          source={{
            uri: "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/2-1-600x600.png",
          }}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.detailContainer}>
          <ToWishListButtom onPress={addToWishListHandler} />
          <Text
            style={styles.foodHeader}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            Burger Size L
          </Text>
          <View style={styles.status}>
            <Text style={styles.statusItem}>SL còn: {quantity}</Text>
            <Text style={{ marginLeft: 20, ...styles.statusItem }}>
              Trạng thái: sẵn sàng
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
              mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả
              mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tảmô tả mô tả
              mô tả mô tả mô tả mô tả mô tả mô tả mô tả mô tả
            </Text>
          </View>
          <Text style={styles.igrHeader}>Nguyên liệu: </Text>
          <Text style={styles.ingredients}>
            hành, cà chua, thịt heo, phô mai
          </Text>
        </View>
      </ScrollView>
      <View style={styles.addToCartBtn}>
        <PrimaryButton title="Thêm vào giỏ" onPress={addToCartHandler} />
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
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 500,
    height: 300,
  },
  detailContainer: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 30,
    paddingTop: 25,
    backgroundColor: COLORS.white,
    minHeight: 800,
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
});

export default DetailScreen;
