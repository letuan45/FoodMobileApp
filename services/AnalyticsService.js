import useAxios from "../hooks/useAxios";
import httpClient from "../utils/axiosInstance";

const getDataUrl = "/orders/chart";

export const getChartData = () => {
  const {
    response: getChartDataRes,
    isLoading: getChartDataIsLoading,
    error: getChartDataErr,
  } = useAxios({
    axiosInstance: httpClient,
    method: "GET",
    url: getDataUrl,
  });

  return {
    getChartDataRes,
    getChartDataIsLoading,
    getChartDataErr,
  };
};
