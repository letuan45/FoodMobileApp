import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import COLORS from "../consts/colors";
import BackButton from "../components/UI/Buttons/BackButton";
import { getProductsReviews } from "../services/ReviewService";
import LoadingSpinner from "../components/UI/Interactors/LoadingSpinner";
import ReviewList from "../components/Review/ReviewList";

const ViewReviewsScreen = ({ navigation, route }) => {
  const itemId = route.params;
  const { reviewRes, reviewIsLoading, reviewErr } = getProductsReviews(itemId);

  let content;
  if (reviewIsLoading) {
    content = <LoadingSpinner></LoadingSpinner>;
  } else if (reviewErr) {
    content = (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
          {reviewErr.data.message}
        </Text>
      </View>
    );
  }

  let reviews = [];
  if (reviewRes) reviews = reviewRes;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton navigation={navigation} />
        <Text style={styles.headerText}>Đánh giá món ăn</Text>
      </View>
      {content}
      <ReviewList items={reviews}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    marginHorizontal: 10,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 22,
    fontWeight: 600,
    textAlign: "center",
    marginLeft: 20,
  },
});

export default ViewReviewsScreen;
