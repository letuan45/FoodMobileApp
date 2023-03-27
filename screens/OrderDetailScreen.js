import React, {useState} from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Pressable,
} from "react-native";
import BackButton from "../components/UI/BackButton";
import COLORS from "../consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import CustomDialog from "../components/UI/CustomDialog";

const DUMMY_CART = [
  {
    id_item: 1,
    name: "Burger Size L Burger Size L Burger Size L",
    price: 100000,
    amount: 1,
    quantity: 12,
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/2-1-600x600.png",
  },
  {
    id_item: 2,
    name: "Burger Size L",
    price: 100000,
    amount: 1,
    quantity: 12,
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/2-1-600x600.png",
  },
  {
    id_item: 3,
    name: "Burger Size L Burger Size L Burger Size L",
    price: 100000,
    amount: 1,
    quantity: 12,
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/2-1-600x600.png",
  },
  {
    id_item: 4,
    name: "Burger Size L",
    price: 100000,
    amount: 1,
    quantity: 12,
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/2-1-600x600.png",
  },
  {
    id_item: 5,
    name: "Burger Size L Burger Size L Burger Size L",
    price: 100000,
    amount: 1,
    quantity: 12,
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/2-1-600x600.png",
  },
  {
    id_item: 6,
    name: "Burger Size L",
    price: 100000,
    amount: 1,
    quantity: 12,
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/2-1-600x600.png",
  },
  {
    id_item: 7,
    name: "Burger Size L Burger Size L Burger Size L",
    price: 100000,
    amount: 1,
    quantity: 12,
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/2-1-600x600.png",
  },
  {
    id_item: 8,
    name: "Burger Size L",
    price: 100000,
    amount: 1,
    quantity: 12,
    image:
      "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/2-1-600x600.png",
  },
];

const DetailItem = ({ item }) => {
  const price = Number(item.price).toLocaleString("en");

  return (
    <View style={styles.detailItem}>
      <Image style={styles.itemImage} source={{ uri: item.image }} />
      <View style={styles.itemContentContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingBottom: 5,
            marginBottom: 5,
            borderBottomWidth: 1,
            borderStyle: "dashed",
          }}
        >
          <Text style={styles.itemName} numberOfLines={1} ellipsizeMode="tail">
            {item.name}
          </Text>
          <Text style={{fontWeight: "bold", color: COLORS.orange, fontSize: 16}}>{price} VND</Text>
        </View>
        <View style={{flexDirection: "row", alignItems: "center"}}>
            <Icon name="close" size={22}/>
            <Text style={{fontSize: 18}}>{item.amount}</Text>
        </View>
      </View>
    </View>
  );
};

const OrderDetailScreen = ({ navigation, route }) => {
  const itemId = route.params;
  const [dialogIsShown, setDialogIsShown] = useState(false);

  const detailItems = DUMMY_CART;

  const handleCancelOrder = () => {
    // Xử lý logic
    console.log(itemId);

    //Đóng Dialog
    setDialogIsShown(false);
  };

  //Show Dialog
  const openDialogHandler = () => {
    setDialogIsShown(true);
  };

  const closeDialogHandler = () => {
    setDialogIsShown(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Dialog xóa item */}
      {dialogIsShown && (
        <CustomDialog
          title="Thông báo"
          content="Bạn có chắc chắn muốn hủy hóa đơn/đơn hàng này?"
          onClose={closeDialogHandler}
          onAgree={handleCancelOrder}
        />
      )}
      <View style={styles.header}>
        <BackButton navigation={navigation} />
        <Text style={styles.headerText}>Chi tiết hóa đơn/đơn hàng</Text>
      </View>
      <View style={styles.innerContainer}>
        <Image
          style={styles.menuBackground}
          source={require("../assets/images/menu-bg.png")}
        />
        <View style={styles.detailContent}>
          <View style={styles.headerContentWrapper}>
            <Text style={styles.headerDetailContent}>
              Mã hóa đơn/đơn hàng: #1
            </Text>
            <Text style={styles.headerDetailContent}>Tình trạng: Đã đặt</Text>
            <Text style={styles.headerDetailContent}>Đặt lúc: 18/03/2023</Text>
          </View>
          <Text style={{ textAlign: "center" }}>
            Địa chỉ: 97 Man Thiện, Phường Hiệp Phú, Q9, Tp Thủ Đức, tp Hồ Chí
            Minh
          </Text>
          <View style={styles.itemsWrapper}>
            <FlatList
              data={detailItems}
              renderItem={({ item }) => <DetailItem item={item} />}
            />
          </View>
        </View>
      </View>
      <Text style={styles.totalPrice}>Tổng tiền: 1,000,000 VND</Text>
      <Pressable style={styles.cancelBtn} onPress={openDialogHandler}>
        <Text
          style={{ fontSize: 20, color: COLORS.white, textAlign: "center" }}
        >
          Hủy hóa đơn
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginLeft: 10,
  },
  headerText: {
    fontSize: 20,
    marginLeft: 10,
    color: COLORS.white,
  },
  innerContainer: {
    height: "90%",
    top: "5%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: COLORS.black,
  },
  menuBackground: {
    top: -26,
    height: "90%",
    resizeMode: "contain",
  },
  detailContent: {
    top: 50,
    position: "absolute",
    paddingVertical: 10,
  },
  headerContentWrapper: {
    justifyContent: "center",
    width: "100%",
  },
  headerDetailContent: {
    fontSize: 20,
    textAlign: "center",
  },
  itemsWrapper: {
    height: 400,
  },
  detailItem: {
    flexDirection: "row",
    width: "100%",
  },
  itemImage: {
    width: 100,
    height: 100,
  },
  itemContentContainer: {
    flex: 1,
    justifyContent: "center",
  },
  itemName: {
    fontWeight: 600,
    fontSize: 16,
    width: 120
  },
  cancelBtn: {
    backgroundColor: COLORS.red,
    paddingHorizontal: 20,
    paddingVertical: 10,
    top: -50,
    justifyContent: "center",
    height: 60,
    marginHorizontal: 20,
    borderRadius: 30
  },
  totalPrice: {
    fontSize: 24,
    textAlign: "center",
    width: "100%",
    fontWeight: "bold",
    color: COLORS.green,
    position: "absolute",
    bottom: 104
  }
});

export default OrderDetailScreen;
