import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import COLORS from "../../../consts/colors";
import httpClient from "../../../utils/axiosInstance";
import useAxios from "../../../hooks/useAxios";
import LoadingSpinner from "../../UI/Interactors/LoadingSpinner";

const icons = [
  <View>
    <Image
      style={{ width: 40, height: 40 }}
      source={require("../../../assets/icons/burger.png")}
    />
  </View>,
  <Image
    style={{ width: 40, height: 40 }}
    source={require("../../../assets/icons/drink.png")}
  />,
  <Image
    style={{ width: 40, height: 40 }}
    source={require("../../../assets/icons/cupcake.png")}
  />,
  <Image
    style={{ width: 40, height: 40 }}
    source={require("../../../assets/icons/onion-rings.png")}
  />,
  <Image
    style={{ width: 40, height: 40 }}
    source={require("../../../assets/icons/pizza.png")}
  />,
  <Image
    style={{ width: 40, height: 40 }}
    source={require("../../../assets/icons/hot-dog.png")}
  />,
];

const getCateURL = "/types";

const Categories = ({ onChangeCate, isLoading }) => {
  const { response: cateRes, error: cateErr } = useAxios({
    axiosInstance: httpClient,
    method: "GET",
    url: getCateURL,
  });
  const [activeCateIndex, setActiveCateIndex] = useState(0);
  let Categories = [];

  useEffect(() => {
    onChangeCate(activeCateIndex);
  }, [activeCateIndex]);

  if (cateErr) {
    return <Text>Lỗi lấy danh mục món ăn...</Text>;
  }
  if (cateRes) {
    Categories = cateRes;
  }

  Categories = Categories.map((item, index) => {
    return { ...item, image: icons[index] };
  });

  const handleChangeCate = (idItem) => {
    setActiveCateIndex(+idItem);
  };


  return (
    <View>
      {isLoading && (
        <View style={styles.loadingWrapper}>
          <LoadingSpinner />
        </View>
      )}
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
            key={item["id_type"]}
            activeOpacity={0.8}
            onPress={handleChangeCate.bind(this, item["id_type"])}
          >
            <View
              style={{
                backgroundColor:
                  item["id_type"] === activeCateIndex
                    ? COLORS.green
                    : COLORS.white,
                ...styles.cateItem,
              }}
            >
              <Text
                style={{
                  color:
                    activeCateIndex === item["id_type"]
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
  loadingWrapper: {
    marginTop: 10
  }
});

export default Categories;
