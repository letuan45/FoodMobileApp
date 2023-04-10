import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Pressable,
  TextInput,
} from "react-native";
import COLORS from "../../consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/index";
import {
  increaseCartItem,
  decreaseCartItem,
  updateCartItem,
} from "../../services/CartService";
import ShowToast from "../../utils/ShowToast";

function isNumeric(num) {
  return !isNaN(num);
}

const CartItem = ({ item, onRemoveItem }) => {
  dispatch = useDispatch();
  const [amount, setAmount] = useState(item.amount);
  const price = Number(item.price).toLocaleString("en");
  const { increaseCartItemRes, increaseCartItemErr, callIncreaseCartItem } =
    increaseCartItem(item["id_item"]);
  const { decreaseCartItemRes, decreaseCartItemErr, callDecreaseCartItem } =
    decreaseCartItem(item["id_item"]);
  const { updateCartItemRes, updateCartItemErr, callUpdateCartItem } =
    updateCartItem(item["id_item"]);

  useEffect(() => {
    setAmount(item.amount);
  }, [item]);

  useEffect(() => {
    if (increaseCartItemRes) {
      ShowToast(increaseCartItemRes.message);
      setAmount((oldAmount) => oldAmount + 1);
      dispatch(cartActions.addTocart({ ...item, amount: 1 }));
    } else if (increaseCartItemErr) {
      ShowToast(increaseCartItemErr.data.message);
    }
  }, [increaseCartItemRes, increaseCartItemErr]);

  useEffect(() => {
    if (decreaseCartItemRes) {
      ShowToast(decreaseCartItemRes.message);
      setAmount((oldAmount) => oldAmount - 1);
      dispatch(cartActions.removeFromCart({ id: item["id_item"] }));
    } else if (decreaseCartItemErr) {
      ToastAndroid.showWithGravity(
        decreaseCartItemErr.data.message,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
  }, [decreaseCartItemRes, decreaseCartItemErr]);

  useEffect(() => {
    if (updateCartItemRes) {
      ShowToast(updateCartItemRes.message);
      dispatch(
        cartActions.updateQuantity({ id: item["id_item"], amount: amount })
      );
    } else if (updateCartItemErr) {
      ShowToast(updateCartItemErr.data.message);
    }
  }, [updateCartItemRes, updateCartItemErr]);

  const minusOneHandler = () => {
    if (amount === 1) {
      onRemoveItem(item["id_item"]);
    } else {
      //Hợp lệ
      callDecreaseCartItem();
    }
  };

  const addOneHandler = () => {
    if (amount + 1 > item.quantity) {
      ShowToast("Vượt quá số lượng cho phép");
      return;
    } else {
      //Hợp lệ
      callIncreaseCartItem();
    }
  };

  const handleRemoveItem = () => {
    onRemoveItem(item["id_item"]);
  };

  const handleAmountChange = (value) => {
    if (!isNumeric(value)) return;
    const numbericValue = +value;
    if (numbericValue > item.quantity) {
      setAmount(item.quantity);
      callUpdateCartItem(item.quantity);
    }
    if (numbericValue <= 0) {
      setAmount(1);
      callUpdateCartItem(1);
    } else {
      //Hợp lệ
      setAmount(numbericValue);
      callUpdateCartItem(numbericValue);
    }
  };

  return (
    <View style={styles.item}>
      <View style={styles.imageWrapper}>
        <Image style={styles.image} source={{ uri: item.image }} />
      </View>
      <View style={styles.contentWrapper}>
        <View style={styles.content}>
          <Text
            style={{ fontSize: 18, fontWeight: 600 }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.name}
          </Text>
          <Text style={{ fontSize: 14, fontStyle: "italic" }}>
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
        <View style={styles.controls}>
          <TextInput
            style={styles.amount}
            value={amount + ""}
            keyboardType="numeric"
            onChangeText={handleAmountChange}
          />
          <View style={styles.amountControl}>
            <Pressable
              style={styles.amountControlBtn}
              onPress={minusOneHandler}
            >
              <Icon name="remove" size={26} color={COLORS.white} />
            </Pressable>
            <View
              style={{
                width: 4,
                backgroundColor: COLORS.greyLight,
                height: "60%",
              }}
            ></View>
            <Pressable style={styles.amountControlBtn} onPress={addOneHandler}>
              <Icon name="add" size={26} color={COLORS.white} />
            </Pressable>
          </View>
        </View>
        <Pressable style={styles.removeBtn} onPress={handleRemoveItem}>
          <Icon name="cancel" size={26} color={COLORS.red} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    height: 100,
    elevation: 8,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  contentWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 5,
    paddingRight: 10,
  },
  content: {
    flex: 5,
  },
  imageWrapper: {
    width: 80,
    marginHorizontal: 10,
    height: 80,
    borderRadius: 8,
    backgroundColor: COLORS.fadeYellow,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 110,
    height: 110,
  },
  controls: {
    flex: 4,
  },
  amount: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    width: "100%",
  },
  amountControl: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.green,
    borderRadius: 50,
  },
  amountControlBtn: {
    height: 30,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  removeBtn: {
    flex: 1,
  },
});

export default CartItem;
