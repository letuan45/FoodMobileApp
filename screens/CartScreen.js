import { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CartList from "../components/Cart/CartList";
import Logo from "../components/UI/Decorations/Logo";
import PrimaryButton from "../components/UI/Buttons/PrimaryButton";
import COLORS from "../consts/colors";
import CustomDialog from "../components/UI/Interactors/CustomDialog";
import RequireLoginScreen from "./RequireLoginScreen";
import { useSelector, useDispatch} from "react-redux";
import { removeCartItem } from "../services/CartService";
import { cartActions } from "../store";
import ShowToast from "../utils/ShowToast";

const CartScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [dialogIsShown, setDialogIsShown] = useState(false);
  const [removeItem, setRemoveItem] = useState(0);
  const user = useSelector((state) => state.auth.user);
  const renderCart = useSelector((state) => state.cart.items);
  const { removeCartItemRes, removeCartItemErr, callRemoveCartItem } =
    removeCartItem();

  useEffect(() => {
    if (removeCartItemRes) {
      ShowToast(removeCartItemRes.message);
      dispatch(cartActions.removeEntireItem({id: removeItem}))
    } else if (removeCartItemErr) {
      ShowToast(removeCartItemErr.data.message);
    }
  }, [removeCartItemRes, removeCartItemErr]);

  if (!user) {
    return <RequireLoginScreen navigation={navigation} />;
  }

  const removeItemHandler = (itemId) => {
    //Xử lý logic
    callRemoveCartItem(itemId);
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

  const totalPrice =
    renderCart.length > 0
      ? renderCart.reduce((acc, item) => acc + item.price * item.amount, 0)
      : 0;
  const renderTotalPrice = Number(totalPrice).toLocaleString("en");

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
      <CartList cartItems={renderCart} onRemoveItem={openDialogHandler} />
      {(renderCart && renderCart.length) > 0 && (
        <View style={styles.summaryWrapper}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryText}>Tổng: </Text>
            <Text style={styles.summaryText}>{renderTotalPrice} VND </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryText}>Giảm giá: </Text>
            <Text style={styles.summaryText}>0 VND </Text>
          </View>
          <View style={styles.summaryPriceWrapper}>
            <Text style={styles.summaryPrice}>Tổng tiền: </Text>
            <Text style={styles.summaryPrice}>{renderTotalPrice} VND </Text>
          </View>
          <View>
            <PrimaryButton
              title="Thanh toán"
              onPress={() => {
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
