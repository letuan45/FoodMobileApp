import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import COLORS from "../consts/colors";
import ShopList from "../components/Shop/ShopList";
import useAxios from "../hooks/useAxios";
import httpClient from "../utils/axiosInstance";
import ShowToast from "../utils/ShowToast";
import LoadingSpinner from "../components/UI/Interactors/LoadingSpinner";

const itemPerPage = 12;
const baseGetItemURl = "/items";
let cateFlagIndex = 1;

const HomeScreen = ({ navigation }) => {
  const [renderProducts, setRenderProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPage, setNumberOfPage] = useState(0);
  const [getItemsURL, setGetItemsURL] = useState(baseGetItemURl);
  const [cateIndex, setCateIndex] = useState(0);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const {
    response: productsRes,
    isLoading: productsIsLoading,
    error: productsError,
    refetch: productsRefetch,
  } = useAxios({
    axiosInstance: httpClient,
    method: "GET",
    url: getItemsURL,
    requestConfig: {
      params: {
        id_type: cateIndex !== 0 ? cateIndex : "",
      },
    },
  });

  useEffect(() => {
    if (productsRes) {
      if (currentPage === 1) {
        setNumberOfPage(Math.ceil(productsRes.totalItems / itemPerPage));
        setRenderProducts(productsRes.itemList);
        setIsFirstTime(false);
      } else {
        setRenderProducts((oldProducts) => {
          return [...oldProducts, ...productsRes.itemList];
        });
      }
    } else if (productsError) {
      ShowToast(productsError.data.message);
    }
  }, [productsRes, productsError]);

  useEffect(() => {
    if (currentPage !== 1 && currentPage <= numberOfPage) {
      setGetItemsURL(baseGetItemURl + `/page/${currentPage}`);
      productsRefetch();
    }
  }, [currentPage]);

  const loadMoreItems = () => {
    if (productsIsLoading || currentPage === numberOfPage) return;
    setCurrentPage((currentPage) => currentPage + 1);
  };

  const handleCateChange = (cateIndex) => {
    if (cateFlagIndex === 1) {
      cateFlagIndex = 0;
      return;
    }
    setCateIndex(cateIndex);
    setCurrentPage(1);
    setGetItemsURL(baseGetItemURl);
    productsRefetch();
  };

  return (
    <SafeAreaView style={styles.container}>
      {isFirstTime && productsIsLoading && <LoadingSpinner />}
      {renderProducts && renderProducts.length > 0 && (
        <ShopList
          navigation={navigation}
          items={renderProducts}
          onLoadMore={loadMoreItems}
          isLoading={productsIsLoading}
          atTheEndList={currentPage === numberOfPage}
          onChangeCate={handleCateChange}
          error={productsError}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});

export default HomeScreen;
