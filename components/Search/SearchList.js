import React from "react";
import { FlatList, View, StyleSheet, Text } from "react-native";
import SearchItem from "./SearchItem";
import LoadingSpinner from "../../components/UI/Interactors/LoadingSpinner";
import COLORS from "../../consts/colors";

const SearchList = ({ itemList, navigation, isLoading }) => {
  let content;

  if (isLoading) {
    content = (
      <View style={{ marginTop: 80 }}>
        <LoadingSpinner />
      </View>
    );
  } else if (itemList && itemList.length > 0) {
    content = (
      <FlatList
        data={itemList}
        renderItem={({ item }) => (
          <SearchItem item={item} navigation={navigation} />
        )}
      />
    );
  } else {
    content = (
      <Text style={{ fontSize: 20, textAlign: "center", color: COLORS.grey }}>
        Hiện chưa tìm thấy món nào.
      </Text>
    );
  }

  return <View style={styles.container}>{content}</View>;
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingBottom: 100,
  },
});

export default SearchList;
