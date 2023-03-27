import { FlatList, Text, View, StyleSheet } from "react-native";
import CartItem from "./CartItem";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../consts/colors";

const CartList = ({ cartItems, onRemoveItem }) => {
  if (!cartItems || cartItems.length === 0) {
    return (
      <View style={styles.empty}>
        <Icon name="remove-shopping-cart" size={40} color={COLORS.greyDark} />
        <Text style={{ fontSize: 18, color: COLORS.greyDark }}>
          Giỏ hàng của bạn đang trống!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.listContainer}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
        data={cartItems}
        renderItem={({ item }) => (
          <CartItem item={item} onRemoveItem={onRemoveItem} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    height: 360,
  },
  empty: {
    marginHorizontal: 20,
    marginVertical: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CartList;
