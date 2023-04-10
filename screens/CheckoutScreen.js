import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  FlatList,
  TextInput,
} from "react-native";
import BackButton from "../components/UI/Buttons/BackButton";
import COLORS from "../consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import PaymentList from "../components/Payment/PaymentList";
import PrimaryButton from "../components/UI/Buttons/PrimaryButton";
import { useSelector, useDispatch } from "react-redux";
import { getCheckoutMethods } from "../services/CheckoutService";
import LoadingSpinner from "../components/UI/Interactors/LoadingSpinner";
import { checkout } from "../services/CheckoutService";
import ShowToast from "../utils/ShowToast";
import { cartActions } from "../store";

const CartItem = ({ item }) => {
  const price = Number(item.price).toLocaleString("en");

  return (
    <View style={styles.cartItem}>
      <Text style={styles.cartItemName} numberOfLines={1} ellipsizeMode="tail">
        {item.name}
      </Text>
      <View style={styles.cartItemInfo}>
        <Text style={{ fontSize: 15, color: COLORS.green, fontWeight: "bold" }}>
          Đơn giá: {price} VND
        </Text>
        <Text style={{ fontSize: 15, color: COLORS.red, fontWeight: "bold" }}>
          X {item.amount}
        </Text>
      </View>
    </View>
  );
};

const CheckoutScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart.items);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [currentPayment, setCurrentPayment] = useState();
  const [description, setDescription] = useState("");
  const { getMethodsRes, getMethodsIsLoading, getMethodsError } =
    getCheckoutMethods();
  const { checkoutRes, checkoutError, checkoutIsLoading, callCheckout } =
    checkout();

  useEffect(() => {
    if (checkoutRes) {
      ShowToast(checkoutRes.message);
      dispatch(cartActions.clearCart());
      navigation.navigate("CheckoutSuccessScreen");
    } else if (checkoutError) {
      ShowToast(checkoutError.data.message);
    }
  }, [checkoutRes, checkoutError]);

  useEffect(() => {
    if (getMethodsRes) {
      setPaymentMethods(getMethodsRes);
      setCurrentPayment(getMethodsRes[0].id_payment);
    }
  }, [getMethodsRes]);

  const totalPrice =
    cartItems.length > 0
      ? cartItems.reduce((acc, item) => acc + item.price * item.amount, 0)
      : 0;
  const renderTotalPrice = Number(totalPrice).toLocaleString("en");

  if (!user) {
    navigation.navigate("Home");
    return;
  }

  const onChangeDescription = (value) => {
    setDescription(value);
  };

  const changePaymentHandler = (idPayment) => {
    setCurrentPayment(idPayment);
  };

  const handleCheckout = () => {
    const values = {
      paymentMethod: currentPayment,
      description: description.trim(),
    };
    callCheckout(values);
  };

  let paymentContent;
  if (getMethodsIsLoading) {
    paymentContent = (
      <View style={{ marginVertical: 30 }}>
        <LoadingSpinner />
      </View>
    );
  } else if (getMethodsError) {
    paymentContent = <Text>Lỗi khi lấy danh sách phương thức thanh toán</Text>;
  } else {
    paymentContent = (
      <PaymentList
        items={paymentMethods}
        activePayment={currentPayment}
        onChangePayment={changePaymentHandler}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton navigation={navigation} />
        <Text style={styles.headerText}>Thanh toán</Text>
      </View>
      <View style={styles.card}>
        <View style={{ paddingHorizontal: 10 }}>
          <View style={styles.cardHeader}>
            <Icon name="monetization-on" size={28} color={COLORS.black} />
            <Text style={styles.cardHeaderText}>
              Chọn phương thức thanh toán
            </Text>
          </View>
          {/* <PaymentList items={paymentMethods} /> */}
          {paymentContent}
          <View style={styles.cardHeader}>
            <Icon name="sms" size={28} color={COLORS.black} />
            <Text style={styles.cardHeaderText}>Ghi chú cho chúng tôi</Text>
          </View>
          <TextInput
            placeholder="Ghi chú của bạn"
            style={styles.description}
            onChangeText={onChangeDescription}
          />
        </View>
      </View>
      <View style={styles.card}>
        <View style={styles.cardContentWraper}>
          <View style={styles.cardHeader}>
            <Icon name="shopping-basket" size={28} color={COLORS.black} />
            <Text style={styles.cardHeaderText}>Giỏ hàng của bạn</Text>
          </View>
          <View style={styles.cartContainer}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={cartItems}
              renderItem={({ item }) => <CartItem item={item} />}
            />
          </View>
        </View>
        <View style={styles.summaryWrapper}>
          <Text style={styles.summaryText}>Tổng tiền: </Text>
          <Text style={styles.summaryText}>{renderTotalPrice} VND</Text>
        </View>
      </View>

      <View style={styles.btnWrapper}>
        <PrimaryButton
          title="Xác nhận thanh toán"
          isLoading={checkoutIsLoading}
          onPress={handleCheckout}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  header: {
    marginHorizontal: 10,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    color: COLORS.white,
    fontSize: 20,
    marginLeft: 10,
  },
  card: {
    borderRadius: 12,
    marginHorizontal: 20,
    marginVertical: 8,
    backgroundColor: COLORS.white,
    paddingVertical: 14,
  },
  cardContentWraper: {
    paddingHorizontal: 10,
    marginBottom: 40,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  cardHeaderText: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.black,
    marginLeft: 10,
  },
  cartItem: {
    elevation: 5,
    borderRadius: 10,
    backgroundColor: COLORS.primaryDark,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 5,
  },
  cartContainer: {
    height: 220,
  },
  cartItemName: {
    fontWeight: 600,
    color: COLORS.white,
    fontSize: 16,
  },
  cartItemInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    marginTop: 2,
  },
  summaryWrapper: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    backgroundColor: COLORS.green,
    position: "absolute",
    bottom: 0,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  summaryText: {
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 10,
    color: COLORS.primary,
  },
  description: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    backgroundColor: COLORS.greyLight,
    height: 54,
  },
  btnWrapper: {
    paddingHorizontal: 20,
  },
});

export default CheckoutScreen;
