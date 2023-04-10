import React from "react";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../../consts/colors";
import { useSelector } from "react-redux";

const CartLogo = ({ color }) => {
  const cart = useSelector((state) => state.cart.items);
  let totalAmount = 0;
  if (cart) {
    totalAmount = cart.reduce(
      (totalAmount, item) => totalAmount + item.amount,
      0
    );
  }

  return (
    <View>
      {totalAmount > 0 && (
        <Text
          style={{
            height: 20,
            width: 30,
            borderRadius: 10,
            position: "absolute",
            right: -18,
            top: -5,
            padding: 2,
            backgroundColor: COLORS.primary,
            zIndex: 1,
            textAlign: "center",
            fontSize: 12,
            elevation: 5,
            color: COLORS.white,
          }}
        >
          {totalAmount}
        </Text>
      )}
      <Icon name="shopping-cart" color={color} size={28} />
    </View>
  );
};

export default CartLogo;
