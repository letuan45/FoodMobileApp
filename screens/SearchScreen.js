import React, { useEffect, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import COLORS from "../consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import SearchList from "../components/Search/SearchList";
import { searchItem } from "../services/SearchItemService";
import ShowToast from "../utils/ShowToast";

const DUMMY_SEACHLIST = [
  // {
  //   id_item: 1,
  //   image:
  //     "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/5-1.png",
  //   name: "Burger Hảo Hạng",
  //   price: 20000,
  // },
  // {
  //   id_item: 2,
  //   image:
  //     "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/5-1.png",
  //   name: "Burger Hảo Hạng",
  //   price: 20000,
  // },
  // {
  //   id_item: 3,
  //   image:
  //     "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/5-1.png",
  //   name: "Burger Hảo Hạng",
  //   price: 20000,
  // },
  // {
  //   id_item: 4,
  //   image:
  //     "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/5-1.png",
  //   name: "Burger Hảo Hạng",
  //   price: 20000,
  // },
  // {
  //   id_item: 5,
  //   image:
  //     "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/5-1.png",
  //   name: "Burger Hảo Hạng",
  //   price: 20000,
  // },
  // {
  //   id_item: 6,
  //   image:
  //     "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/5-1.png",
  //   name: "Burger Hảo Hạng",
  //   price: 20000,
  // },
  // {
  //   id_item: 7,
  //   image:
  //     "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/5-1.png",
  //   name: "Burger Hảo Hạng",
  //   price: 20000,
  // },
  // {
  //   id_item: 8,
  //   image:
  //     "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/5-1.png",
  //   name: "Burger Hảo Hạng",
  //   price: 20000,
  // },
  // {
  //   id_item: 9,
  //   image:
  //     "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/5-1.png",
  //   name: "Burger Hảo Hạng",
  //   price: 20000,
  // },
  // {
  //   id_item: 10,
  //   image:
  //     "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/5-1.png",
  //   name: "Burger Hảo Hạng",
  //   price: 20000,
  // },
];

const SearchScreen = ({ navigation }) => {
  const [searchValue, setSearchValue] = useState("");
  const [foodItems, setFoodItems] = useState([]);

  const { searchResponse, searchError, searchIsLoading, callSearchItem } =
    searchItem();

  useEffect(() => {
    if (searchResponse) {
      setFoodItems(searchResponse);
    } else if (searchError) {
      ShowToast(searchError.data.message);
    }
  }, [searchResponse, searchError]);

  useEffect(() => {
    const value = searchValue.trim();
    if (value.length > 0) {
      callSearchItem(value);
    }
    if(value.length === 0) setFoodItems([]);
    //console.log(callSearchItem("Burger"));
  }, [searchValue]);

  const handleSearchKeyPress = (value) => {
    setSearchValue(value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBar}>
        <Pressable
          style={styles.searchButton}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="arrow-back-ios" size={30} />
        </Pressable>
        <TextInput
          onChangeText={handleSearchKeyPress}
          style={styles.searchInput}
          placeholder="Nhập tên món cần tìm"
        />
      </View>
      <SearchList
        itemList={foodItems.itemList}
        navigation={navigation}
        isLoading={searchIsLoading}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#edf6f9",
    elevation: 6,
  },
  searchBar: {
    marginTop: 18,
    marginHorizontal: 20,
    flexDirection: "row",
    backgroundColor: COLORS.white,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
  },
  searchButton: {
    paddingLeft: 20,
    width: "14%",
  },
  searchInput: {
    fontSize: 18,
    width: "76%",
  },
});

export default SearchScreen;
