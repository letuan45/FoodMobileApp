import React from "react";
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import COLORS from "../../consts/colors";
const screenWidth = Dimensions.get("window").width;

const OrdersChart = ({renderData}) => {
  console.log(renderData);
  const data = {
    labels: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
    datasets: [
      {
        data: renderData,
      },
    ],
  };

  return (
    <BarChart
      style={graphStyle}
      data={data}
      width={screenWidth - 40}
      height={260}
      chartConfig={chartConfig}
      verticalLabelRotation={0}
    />
  );
};

const graphStyle = {
  marginBottom: 10,
  borderRadius: 12,
};

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0.8,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 1,
  color: (opacity = 1) => `${COLORS.primary}`,
  labelColor: (opacity = 1) => `${COLORS.white}`,
  barPercentage: 0.6,
  decimalPlaces: 0,
  useShadowColorFromDataset: false, // optional
  style: {
    borderRadius: 12,
  },
};

export default OrdersChart;
