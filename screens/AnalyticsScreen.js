import React, { Fragment, useEffect, useState } from "react";
import { View, SafeAreaView, StyleSheet, Text } from "react-native";
import COLORS from "../consts/colors";
import BackButton from "../components/UI/Buttons/BackButton";
import OrdersChart from "../components/Analytics/OrdersChart";
import TypesChart from "../components/Analytics/TypesChart";
import { getChartData } from "../services/AnalyticsService";
import LoadingSpinner from "../components/UI/Interactors/LoadingSpinner";

const AnalyticsScreen = ({ navigation }) => {
  const { getChartDataRes, getChartDataIsLoading, getChartDataErr } =
    getChartData();
  const [renderBarChartData, setRenderBarChartData] = useState([]);
  const [renderPieChartData, setRenderPieChartData] = useState([]);

  useEffect(() => {
    if (getChartDataRes) {
      //Barchart Data
      const data = [0, 0, 0, 0, 0, 0, 0];
      const successOrders = getChartDataRes.orderList;

      for (order of successOrders) {
        const date = new Date(order.datetime);
        const dayNum = date.getDay();
        data[dayNum-1] += order.total;
        
      }
      setRenderBarChartData(data);

      //Piechart Data
      const data2 = [0, 0, 0, 0, 0, 0];

      for (item of successOrders) {
        const orderItems = item["Order_details"];

        for (item of orderItems) {
          data2[item.Item["id_type"] - 1] += item.quantity;
        }
      }
      setRenderPieChartData(data2);
    }
  }, [getChartDataRes]);

  let content;
  if (getChartDataIsLoading) {
    content = <LoadingSpinner />;
  } else if (getChartDataErr) {
    content = (
      <Text style={styles.notifyMessage}>{getChartDataErr.data.message}</Text>
    );
  } else if (renderBarChartData.length > 0) {
    content = (
      <Fragment>
        <View style={styles.chartContainer}>
          <OrdersChart renderData={renderBarChartData} />
          <Text style={styles.chartHeaders}>Tổng chi theo các ngày</Text>
        </View>
        <View style={{ ...styles.chartContainer, marginBottom: 130 }}>
          <TypesChart renderData={renderPieChartData} />
          <Text style={styles.chartHeaders}>Tần suất số lượng tiêu thụ theo loại</Text>
        </View>
      </Fragment>
    );
  } else {
    content = <Text style={styles.notifyMessage}>Không có dữ liệu</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton navigation={navigation} isDark />
        <Text style={styles.headerText}>Thống kê trong tuần</Text>
      </View>
      <View style={styles.contentWrapper}>{content}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginLeft: 20,
  },
  headerText: {
    fontSize: 22,
    marginLeft: 10,
  },
  contentWrapper: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: "space-between",
    marginTop: 20,
  },
  chartHeaders: {
    fontSize: 20,
    fontWeight: 600,
    textAlign: "center",
  },
  chartContainer: {
    marginVertical: 12,
  },
  notifyMessage: {
    fontSize: 20,
    fontWeight: 600,
    textAlign: "center",
  },
});

export default AnalyticsScreen;
