import { View, StyleSheet, Image, Text, Pressable } from "react-native";
import COLORS from "../../consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";

const CartItem = ({ item, onRemoveItem }) => {
  const price = Number(item.price).toLocaleString("en");

  const handleRemoveItem = () => {
    onRemoveItem(item["id_item"]);
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
          <Text style={styles.amount}>3</Text>
          <View style={styles.amountControl}>
            <Pressable style={styles.amountControlBtn}>
              <Icon name="remove" size={26} color={COLORS.white} />
            </Pressable>
            <View
              style={{
                width: 4,
                backgroundColor: COLORS.greyLight,
                height: "60%",
              }}
            ></View>
            <Pressable style={styles.amountControlBtn}>
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
    width: 120,
    height: 120,
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
