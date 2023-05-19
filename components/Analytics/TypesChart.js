import React from "react";
import { PieChart } from "react-native-chart-kit/dist";
import { Dimensions } from "react-native";
import COLORS from "../../consts/colors";
const screenWidth = Dimensions.get("window").width;

const TypesChart = ({ renderData }) => {
  const data = [
    {
      name: "Burger",
      population: renderData[0],
      color: COLORS.primary,
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Đồ uống",
      population: renderData[1],
      color: COLORS.green,
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Đồ ngọt",
      population: renderData[2],
      color: COLORS.red,
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Pasta",
      population: renderData[3],
      color: COLORS.orange,
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Pizza",
      population: renderData[4],
      color: "#00b4d8",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Khác",
      population: renderData[5],
      color: COLORS.greyDark,
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  return (
    <PieChart
      data={data}
      width={screenWidth - 40}
      height={240}
      chartConfig={chartConfig}
      accessor={"population"}
      backgroundColor={"transparent"}
      paddingLeft={"25"}
    />
  );
};

const chartConfig = {
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
};

export default TypesChart;
