import { Text } from "react-native";
import { Image, View } from "react-native";

const EmpyWishlist = () => {
  return (
    <View style={{ width: "100%", marginTop: 80}}>
      <Image
        style={{ width: "100%" }}
        source={require("../../assets/images/empty-wishlist.png")}
      />
      <Text style={{ textAlign: "center", fontSize: 22, marginTop: 10 }}>
        Danh mục yêu thích đang trống.
      </Text>
    </View>
  );
};

export default EmpyWishlist;
