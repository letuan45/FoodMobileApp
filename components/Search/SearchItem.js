import React from "react";
import { TouchableOpacity, View, Image, Text, StyleSheet } from "react-native";
import COLORS from "../../consts/colors";

const itemWidthHeight = 100;

const SearchItem = ({ item, navigation }) => {
  const price = Number(item.price).toLocaleString("en");

  const toDetailHandler = () => {
    navigation.navigate("DetailScreen", item["id_item"]);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={toDetailHandler}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.itemDesc}>
        <Text style={{ color: COLORS.green, fontSize: 16, fontWeight: 600 }}>
          {item.name}
        </Text>
        <Text
          style={{ color: COLORS.primaryDark, fontSize: 16, fontWeight: 600 }}
        >
          {price} VND
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: COLORS.white,
    elevation: 6,
    marginVertical: 12,
    borderRadius: 20,
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    height: 64,
  },
  image: {
    width: itemWidthHeight,
    height: itemWidthHeight,
    position: "absolute",
  },
  itemDesc: {
    marginLeft: itemWidthHeight,
  },
});

export default SearchItem;
