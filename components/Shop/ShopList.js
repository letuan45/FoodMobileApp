import { View, Text, Image, FlatList } from "react-native";
import COLORS from "../../consts/colors";
import FoodItem from "./FoodItem";
import { ActivityIndicator } from "react-native-paper";

const ShopList = ({ navigation, items, isLoading }) => {
  //Call api
  const products = items;

  if (isLoading) {
    return (
      <View style={{ marginTop: 40 }}>
        <ActivityIndicator
          size="large"
          animating={true}
          color={COLORS.primary}
        />
      </View>
    );
  }

  if (!products || products.length === 0) {
    return (
      <View style={{ alignItems: "center" }}>
        <Image
          source={require("../../assets/images/no-results.png")}
          style={{ width: 100, height: 100, marginTop: 50 }}
        />
        <Text style={{ fontSize: 18, marginTop: 10, color: COLORS.grey }}>
          Không tìm thấy kết quả bạn muốn.
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", height: 1500}}>
      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={(item) => item["id_item"]}
        renderItem={({ item }) => (
          <FoodItem item={item} navigation={navigation} />
        )}
      />
      {/* {products.map((item) => (
        <FoodItem item={item} key={item["id_item"]} navigation={navigation} />
      ))} */}
    </View>
  );
};

export default ShopList;
