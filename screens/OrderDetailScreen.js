import React, { Fragment, useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Pressable,
  TouchableOpacity,
} from "react-native";
import BackButton from "../components/UI/Buttons/BackButton";
import COLORS from "../consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import CustomDialog from "../components/UI/Interactors/CustomDialog";
import { useSelector } from "react-redux";
import { getOrderDetail, cancelOrder } from "../services/OrdersService";
import LoadingSpinner from "../components/UI/Interactors/LoadingSpinner";
import ShowToast from "../utils/ShowToast";
import ReviewForm from "../components/Review/ReviewForm";

const DetailItem = ({ item, openReview, hideReview }) => {
  const price = Number(item.price).toLocaleString("en");
  const subtotal = Number(item.price * item.quantity).toLocaleString("en");

  const openReviewForm = () => {
    openReview(item);
  };

  const displayReviewBtn = item.isReviewed === 0 && !hideReview;

  return (
    <View style={styles.detailItem}>
      {displayReviewBtn && (
        <TouchableOpacity onPress={openReviewForm}>
          <View style={styles.reviewBtn}>
            <Icon name="comment" size={18} color={COLORS.white} />
          </View>
        </TouchableOpacity>
      )}
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
          <Text
            style={{ fontWeight: "bold", color: COLORS.orange, fontSize: 16 }}
          >
            {price} VND
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name="close" size={22} />
            <Text style={{ fontSize: 18 }}>{item.quantity}</Text>
          </View>
          <View>
            <Text
              style={{ fontSize: 18, color: COLORS.greenDark, fontWeight: 600 }}
            >
              {subtotal} VND
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const OrderDetailScreen = ({ navigation, route }) => {
  const itemId = route.params;
  const [dialogIsShown, setDialogIsShown] = useState(false); //Cancel Dialog
  const [reviewFormIsShown, setReviewFormIsShown] = useState(false); //Cancel Dialog
  const [orderDetail, setOrderDetail] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const [reviewProduct, setReviewProduct] = useState(null);

  const {
    getOrdersDetailResponse,
    getOrdersDetailIsLoading,
    getOrdersDetailError,
    refetchOrder,
  } = getOrderDetail(itemId);
  const {
    cancelOrderRes,
    cancelOrderError,
    cancelOrderIsLoading,
    callCancelOrder,
  } = cancelOrder();

  useEffect(() => {
    if (cancelOrderRes) {
      ShowToast(cancelOrderRes.message);
      refetchOrder();
    } else if (cancelOrderError) {
      ShowToast(cancelOrderError.data.message);
    }
  }, [cancelOrderError, cancelOrderRes]);

  useEffect(() => {
    if (getOrdersDetailResponse) {
      setOrderDetail(getOrdersDetailResponse);
    }
  }, [getOrdersDetailResponse]);

  if (!orderDetail || getOrdersDetailError) {
    return;
  }

  const detailItems = orderDetail.itemList;

  const totalPrice = Number(orderDetail.total).toLocaleString("en");

  const handleCancelOrder = () => {
    // Xử lý logic
    callCancelOrder(itemId);

    //Đóng Dialog
    setDialogIsShown(false);
  };

  //Show Dialog cancel
  const openDialogHandler = () => {
    setDialogIsShown(true);
  };

  const closeDialogHandler = () => {
    setDialogIsShown(false);
  };

  //Show Dialog Review
  const openReviewHandler = (item) => {
    setReviewProduct(item);
    setReviewFormIsShown(true);
  };

  const closeReviewHandler = () => {
    setReviewFormIsShown(false);
  };

  if (!user) {
    navigation.navigate("Home");
    return;
  }

  let status;
  if (orderDetail.status === 0) {
    status = "Chưa xác nhận";
  } else if (orderDetail.status === 1) {
    status = "Đã xác nhận";
  } else {
    status = "Đã hủy";
  }

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
      {reviewFormIsShown && (
        <CustomDialog
          title={`Đánh giá ${reviewProduct.name}`}
          elementContent={
            <ReviewForm
              onClose={closeReviewHandler}
              onReload={refetchOrder}
              productId={reviewProduct["id_item"]}
              orderId={itemId}
            />
          }
          onClose={closeReviewHandler}
          bigModal
        />
      )}
      {getOrdersDetailIsLoading ? (
        <LoadingSpinner />
      ) : (
        <Fragment>
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
                  Mã hóa đơn/đơn hàng: #{itemId}
                </Text>
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  <Text style={styles.headerDetailContent}>Tình trạng:</Text>
                  <Text
                    style={{
                      ...styles.headerDetailContent,
                      fontWeight: 600,
                      marginLeft: 5,
                    }}
                  >
                    {status}
                  </Text>
                </View>
                <Text style={styles.headerDetailContent}>
                  Đặt lúc: {orderDetail.datetime}
                </Text>
              </View>
              <Text style={{ textAlign: "center" }}>
                Địa chỉ: {user.address}
              </Text>
              <View style={styles.itemsWrapper}>
                <FlatList
                  data={detailItems}
                  renderItem={({ item }) => (
                    <DetailItem
                      item={item}
                      openReview={openReviewHandler}
                      hideReview={orderDetail.status !== 1}
                    />
                  )}
                />
              </View>
            </View>
          </View>
          <Text style={styles.totalPrice}>Tổng tiền: {totalPrice} VND</Text>
          {orderDetail.status === 0 && (
            <Pressable style={styles.cancelBtn} onPress={openDialogHandler}>
              {cancelOrderIsLoading && <LoadingSpinner size="small" />}
              {!cancelOrderIsLoading && (
                <Text
                  style={{
                    fontSize: 20,
                    color: COLORS.white,
                    textAlign: "center",
                  }}
                >
                  Hủy hóa đơn
                </Text>
              )}
            </Pressable>
          )}
        </Fragment>
      )}
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
    paddingTop: 12,
    height: 400,
  },
  detailItem: {
    flexDirection: "row",
    width: "100%",
  },
  itemImage: {
    width: 110,
    height: 110,
    zIndex: -1,
  },
  itemContentContainer: {
    flex: 1,
    justifyContent: "center",
  },
  itemName: {
    fontWeight: 600,
    fontSize: 16,
    width: 120,
  },
  cancelBtn: {
    backgroundColor: COLORS.red,
    paddingHorizontal: 20,
    paddingVertical: 10,
    top: -50,
    justifyContent: "center",
    height: 60,
    marginHorizontal: 20,
    borderRadius: 30,
  },
  totalPrice: {
    fontSize: 24,
    textAlign: "center",
    width: "100%",
    fontWeight: "bold",
    color: COLORS.green,
    position: "absolute",
    bottom: 104,
  },
  orderError: {
    fontSize: 20,
    textAlign: "center",
  },
  reviewBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.green,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    position: "absolute",
  },
});

export default OrderDetailScreen;
