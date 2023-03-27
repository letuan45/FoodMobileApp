import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import CartList from "../components/Cart/CartList";
import Logo from "../components/UI/Logo";
import PrimaryButton from "../components/UI/PrimaryButton";
import COLORS from "../consts/colors";
import CustomDialog from "../components/UI/CustomDialog";

const DUMMY_CART = [
  {
    id_item: 1,
    name: "Burger Size L Burger Size L Burger Size L",
    price: 100000,
    amount: 1,
    quantity: 12,
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/2-1-600x600.png",
  },
  {
    id_item: 2,
    name: "Burger Size L",
    price: 100000,
    amount: 1,
    quantity: 12,
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/2-1-600x600.png",
  },
  {
    id_item: 3,
    name: "Burger Size L Burger Size L Burger Size L",
    price: 100000,
    amount: 1,
    quantity: 12,
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/2-1-600x600.png",
  },
  {
    id_item: 4,
    name: "Burger Size L",
    price: 100000,
    amount: 1,
    quantity: 12,
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/2-1-600x600.png",
  },
  {
    id_item: 5,
    name: "Burger Size L Burger Size L Burger Size L",
    price: 100000,
    amount: 1,
    quantity: 12,
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/2-1-600x600.png",
  },
  {
    id_item: 6,
    name: "Burger Size L",
    price: 100000,
    amount: 1,
    quantity: 12,
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/2-1-600x600.png",
  },
  {
    id_item: 7,
    name: "Burger Size L Burger Size L Burger Size L",
    price: 100000,
    amount: 1,
    quantity: 12,
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/2-1-600x600.png",
  },
  {
    id_item: 8,
    name: "Burger Size L",
    price: 100000,
    amount: 1,
    quantity: 12,
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/2-1-600x600.png",
  },
];

const CartScreen = ({ navigation }) => {
  const [dialogIsShown, setDialogIsShown] = useState(false);
  const [removeItem, setRemoveItem] = useState(0)
  const cart = DUMMY_CART;

  const removeItemHandler = (itemId) => {
    //Xử lý logic
    console.log("remove", itemId);

    //Xử lý xong, đóng dialog
    setDialogIsShown(false);
  };

  //Show Dialog
  const openDialogHandler = (itemId) => {
    setDialogIsShown(true);
    setRemoveItem(itemId);
  };

  const closeDialogHandler = () => {
    setDialogIsShown(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Dialog xóa item */}
      {dialogIsShown && (
        <CustomDialog
          title="Thông báo"
          content="Bạn có chắc chắn muốn xóa món này khỏi giỏ hàng?"
          itemId={removeItem}
          onClose={closeDialogHandler}
          onAgree={removeItemHandler}
        />
      )}
      <View style={styles.logoWrapper}>
        <Logo />
      </View>
      <Text style={styles.cartHeader}>Giỏ hàng của bạn</Text>
      <CartList cartItems={cart} onRemoveItem={openDialogHandler} />
      {(cart && cart.length) > 0 && (
        <View style={styles.summaryWrapper}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryText}>Tổng: </Text>
            <Text style={styles.summaryText}>500,000 VND </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryText}>Giảm giá: </Text>
            <Text style={styles.summaryText}>0 VND </Text>
          </View>
          <View style={styles.summaryPriceWrapper}>
            <Text style={styles.summaryPrice}>Tổng tiền: </Text>
            <Text style={styles.summaryPrice}>500,000 VND </Text>
          </View>
          <View>
            <PrimaryButton
              title="Thanh toán"
              onPress={() => {
                ToastAndroid.showWithGravityAndOffset(
                  "Toast xuất hiện",
                  ToastAndroid.LONG,
                  ToastAndroid.BOTTOM,
                  25,
                  50
                );
                navigation.navigate("CheckoutScreen");
              }}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  logoWrapper: {
    marginVertical: 30,
    width: "100%",
    alignItems: "center",
  },
  cartHeader: {
    paddingHorizontal: 20,
    fontSize: 26,
    fontWeight: 600,
    marginBottom: 8,
  },
  summaryWrapper: {
    backgroundColor: COLORS.fadeYellow,
    elevation: 5,
    marginHorizontal: 20,
    marginVertical: 20,
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderRadius: 12,
  },
  summaryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryText: {
    fontSize: 20,
  },
  summaryPrice: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.green,
    marginBottom: 8,
  },
  summaryPriceWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    marginTop: 10,
    borderTopWidth: 1,
    borderStyle: "dashed",
  },
});

export default CartScreen;
