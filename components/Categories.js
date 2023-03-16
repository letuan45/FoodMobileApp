import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import COLORS from "../consts/colors";

const DUMMY_CATEGORIES = [
  {
    id_item: 1,
    name: "Burger",
  },
  {
    id_item: 2,
    name: "Đồ uống",
  },
  {
    id_item: 3,
    name: "Đồ ngọt",
  },
  {
    id_item: 4,
    name: "Pasta",
  },
  {
    id_item: 5,
    name: "Pizza",
  },
  {
    id_item: 6,
    name: "Khác",
  },
];

const icons = [
  <View>
    <Image
      style={{ width: 40, height: 40 }}
      source={require("../assets/icons/burger.png")}
    />
  </View>,
  <Image
    style={{ width: 40, height: 40 }}
    source={require("../assets/icons/drink.png")}
  />,
  <Image
    style={{ width: 40, height: 40 }}
    source={require("../assets/icons/cupcake.png")}
  />,
  <Image
    style={{ width: 40, height: 40 }}
    source={require("../assets/icons/onion-rings.png")}
  />,
  <Image
    style={{ width: 40, height: 40 }}
    source={require("../assets/icons/pizza.png")}
  />,
  <Image
    style={{ width: 40, height: 40 }}
    source={require("../assets/icons/hot-dog.png")}
  />,
];

const Categories = () => {
  const [activeCateIndex, setActiveCateIndex] = useState(0);
  let Categories = DUMMY_CATEGORIES;
  Categories = Categories.map((item, index) => {
    return { ...item, image: icons[index] };
  });

  const handleChangeCate = (idItem) => {
    setActiveCateIndex(+idItem);
  };

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.container}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleChangeCate.bind(this, 0)}
        >
          <View
            style={{
              backgroundColor:
                activeCateIndex === 0 ? COLORS.primary : COLORS.white,
              ...styles.cateItem,
            }}
          >
            <Text
              style={{
                color: activeCateIndex === 0 ? COLORS.white : COLORS.black,
                ...styles.cateText,
              }}
            >
              Tất cả
            </Text>
          </View>
        </TouchableOpacity>
        {Categories.map((item) => (
          <TouchableOpacity
            key={item["id_item"]}
            activeOpacity={0.8}
            onPress={handleChangeCate.bind(this, item["id_item"])}
          >
            <View
              style={{
                backgroundColor:
                  item["id_item"] === activeCateIndex
                    ? COLORS.primary
                    : COLORS.white,
                ...styles.cateItem,
              }}
            >
              <Text
                style={{
                  color:
                    activeCateIndex === item["id_item"]
                      ? COLORS.white
                      : COLORS.black,
                  ...styles.cateText,
                }}
              >
                {item.name}
              </Text>
              {item.image}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    alignContent: "center",
    marginVertical: 16,
  },
  cateItem: {
    height: 48,
    width: 130,
    marginRight: 7,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
    flexDirection: "row",
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  cateText: {
    fontSize: 16,
    fontWeight: 600,
  },
});

export default Categories;
