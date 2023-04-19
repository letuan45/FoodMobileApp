import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import COLORS from "../../consts/colors";
import FoodItem from "./FoodItem";
import { ActivityIndicator } from "react-native-paper";
import { Dimensions } from "react-native";
import { Fragment } from "react";
import ShopHeader from "./ShopHeader";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useRef } from "react";

const deviceHeight = Dimensions.get("window").height;

const BottomIndicator = ({ atTheEndList }) => {
  if (atTheEndList) return;
  return (
    <View style={styles.loadingIndiWrapper}>
      <ActivityIndicator size={45} color={COLORS.primaryDark} />
    </View>
  );
};

const ShopList = ({
  navigation,
  items,
  isLoading,
  onLoadMore,
  atTheEndList,
  onChangeCate,
  error
}) => {
  //Call api
  const products = items;
  const listRef = useRef();

  const toTop = () => {
    listRef.current.scrollToOffset({ animated: true, offset: 0 });
  };
  let content = null;

  if (!isLoading && (!products || products.length === 0) && error) {
    content = (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image
          source={require("../../assets/images/no-results.png")}
          style={{ width: 100, height: 100, marginTop: 50 }}
        />
        <Text style={{ fontSize: 18, marginTop: 10, color: COLORS.grey }}>
          Không tìm thấy kết quả bạn muốn.
        </Text>
      </View>
    );
  } else {
    content = (
      <View style={styles.itemsContainer}>
        <FlatList
          ref={listRef}
          data={products}
          ListHeaderComponent={
            <ShopHeader navigation={navigation} onChangeCate={onChangeCate} />
          }
          ListFooterComponent={<BottomIndicator atTheEndList={atTheEndList} />}
          numColumns={2}
          keyExtractor={(item) => item["id_item"]}
          renderItem={({ item }) => (
            <FoodItem item={item} navigation={navigation} />
          )}
          onEndReachedThreshold={0}
          onEndReached={onLoadMore}
        />
        <TouchableOpacity
          style={styles.toTopButtonWrapper}
          onPress={toTop}
          activeOpacity={0.8}
        >
          <View style={styles.topTopButton}>
            <Icon name="expand-less" size={40} color={COLORS.primary} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  return <Fragment>{content}</Fragment>;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  itemsContainer: {
    flexWrap: "wrap",
    height: deviceHeight,
    // height: deviceHeight - variables.bottomNavigateHeight,
  },
  loadingIndiWrapper: {
    marginBottom: 50,
  },
  toTopButtonWrapper: {
    position: "absolute",
    bottom: 30,
    right: 6,
  },
  topTopButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.green,
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
  },
});

export default ShopList;
