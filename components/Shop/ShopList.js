import { View, Text } from "react-native";
import FoodItem from "./FoodItem";

const DUMMY_PRODUCTS = [
  {
    id_item: 1,
    name: "Burger Size L",
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/2-1-600x600.png",
    price: 100000,
    quantity: 20,
  },
  {
    id_item: 2,
    name: "Burger Size L",
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/2-1-600x600.png",
    price: 100000,
    quantity: 20,
  },
  {
    id_item: 3,
    name: "Burger Size L",
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/2-1-600x600.png",
    price: 100000,
    quantity: 20,
  },
  {
    id_item: 4,
    name: "Burger Size L",
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/2-1-600x600.png",
    price: 100000,
    quantity: 20,
  },
];

const ShopList = ({navigation}) => {
  //Call api
  const products = DUMMY_PRODUCTS;
  if (!products && products.length === 0) {
    return (
      <View>
        <Text style={{ fontSize: 20, textAlign: "center" }}>
          Không có sản phẩm nào...
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
      {products.map((item) => (
        <FoodItem item={item} key={item["id_item"]} navigation={navigation} />
      ))}
    </View>
  );
};

export default ShopList;
