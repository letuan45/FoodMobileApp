import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import CartList from "../components/Cart/CartList";
import Logo from "../components/UI/Logo";
import PrimaryButton from "../components/UI/PrimaryButton";
import COLORS from "../consts/colors";

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

const CartScreen = () => {
  const cart = DUMMY_CART;


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoWrapper}>
        <Logo />
      </View>
      <Text style={styles.cartHeader}>Giỏ hàng của bạn</Text>
      {(!cart && cart.length) > 0 && (
        <View style={styles.addToCartBtn}>
          <PrimaryButton title="Thanh toán" onPress={() => {}} />
        </View>
      )}
      <CartList cartItems={cart} />
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
    marginBottom: 12
  },
  addToCartBtn: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    paddingHorizontal: 20,
    zIndex: 10,
  },
});

export default CartScreen;
