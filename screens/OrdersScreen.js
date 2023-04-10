import React, { Fragment, useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import COLORS from "../consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import { FlatList } from "react-native";
import RequireLoginScreen from "./RequireLoginScreen";
import { useSelector } from "react-redux";
import { getOrders } from "../services/OrdersService";
import LoadingSpinner from "../components/UI/Interactors/LoadingSpinner";

const OrderItem = ({ item, navigation }) => {
  const itemId = item.id_order;
  let status;
  if (item.status === 0) {
    status = "Chưa xác nhận";
  } else if (item.status === 1) {
    status = "Đã xác nhận";
  } else {
    status = "Đã hủy";
  }

  const handleOpenDetail = () => {
    navigation.navigate("OrderDetailScreen", itemId);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.orderItem}
      onPress={handleOpenDetail}
    >
      <Text style={styles.orderId}>Mã hóa đơn: #{itemId}</Text>
      <Text style={styles.status}>Tình trạng: {status}</Text>
      <Text style={styles.date}>Đặt lúc: {item.datetime}</Text>
    </TouchableOpacity>
  );
};

const OrdersScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const { getOrdersResponse, getOrdersError, getOrdersIsLoading } = getOrders();

  useEffect(() => {
    if (getOrdersResponse) {
      setOrders(getOrdersResponse);
    }
  }, [getOrdersResponse]);

  if (!user) {
    return <RequireLoginScreen navigation={navigation} />;
  }

  let content;
  if(getOrdersIsLoading) {
    content = <LoadingSpinner/>
  }
  else if (getOrdersError) {
    console.log(getOrdersError)
    content = (
      <Text style={{ marginVertical: 40, fontSize: 20, textAlign: "center" }}>
        Lỗi khi tải danh sách đơn hàng
      </Text>
    );
  }
  else if (!orders || orders.length === 0) {
    content = (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image
          style={{ width: "80%" }}
          source={require("../assets/images/no-order.png")}
        />
        <Text style={{ fontSize: 25, color: COLORS.grey }}>
          Bạn chưa có giao dịch nào!
        </Text>
      </View>
    );
  } else {
    const ordersCount = orders.length;
    const totalPrice = orders.reduce(
      (totalPrice, order) => totalPrice + order.total,
      0
    );
    const totalDisplayPrice = Number(totalPrice).toLocaleString("en");
    content = (
      <Fragment>
        <View style={styles.summaryContainer}>
          <View style={styles.summaryQuantity}>
            <View style={styles.headerWrapper}>
              <Icon name="fastfood" size={30} color={COLORS.white} />
              <Text style={styles.headerContent}>Tổng hóa đơn</Text>
            </View>
            <Text style={styles.summaryValue}>{ordersCount}</Text>
          </View>
          <View style={styles.summaryMoney}>
            <View style={styles.headerWrapper}>
              <Icon name="monetization-on" size={30} color={COLORS.white} />
              <Text style={styles.headerContent}>Tổng chi</Text>
            </View>
            <Text style={styles.summaryValue}>{totalDisplayPrice} VND</Text>
          </View>
        </View>
        <View style={{ height: 580 }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={orders}
            renderItem={({ item }) => (
              <OrderItem item={item} navigation={navigation} />
            )}
          />
        </View>
      </Fragment>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Lịch sử đơn hàng</Text>
      <View style={styles.innerContainer}>{content}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.orange,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    color: COLORS.white,
  },
  innerContainer: {
    top: "10%",
    height: "90%",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: COLORS.white,
  },
  summaryContainer: {
    top: -40,
    marginBottom: -30,
    flexDirection: "row",
    justifyContent: "center",
  },
  summaryQuantity: {
    borderRadius: 12,
    width: 180,
    backgroundColor: COLORS.red,
    paddingHorizontal: 16,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    elevation: 12,
  },
  headerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerContent: {
    fontSize: 18,
    color: COLORS.white,
    marginLeft: 10,
  },
  summaryMoney: {
    borderRadius: 12,
    width: 180,
    backgroundColor: COLORS.green,
    paddingHorizontal: 16,
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 12,
  },
  summaryValue: {
    fontSize: 18,
    marginTop: 5,
    fontWeight: "bold",
    color: COLORS.primary,
    textAlign: "center"
  },
  orderItem: {
    borderRadius: 12,
    paddingHorizontal: 18,
    marginHorizontal: 20,
    paddingVertical: 14,
    elevation: 14,
    backgroundColor: COLORS.primaryDark,
    marginVertical: 8,
  },
  orderId: {
    fontSize: 18,
    fontWeight: "bold",
  },
  status: {
    color: COLORS.fadeYellow,
    fontSize: 16,
    fontWeight: 600,
  },
  date: {
    color: COLORS.green,
    fontSize: 18,
    fontWeight: 600,
    fontStyle: "italic",
  },
});

export default OrdersScreen;
