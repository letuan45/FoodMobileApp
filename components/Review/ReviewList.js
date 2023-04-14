import { FlatList, Text, View, StyleSheet, Image } from "react-native";
import COLORS from "../../consts/colors";
import { Rating } from "react-native-ratings";

const userImage = require("../../assets/icons/user.png");

const ReviewItem = ({ item }) => {
  return (
    <View style={styles.reviewItem}>
      <Image source={userImage} style={styles.userImage} />
      <View style={styles.reviewInfo}>
        <Text style={{ fontSize: 18, fontWeight: 600 }}>{item.name}</Text>
        <Text
          style={{ fontSize: 14, color: COLORS.greyDark, fontStyle: "italic" }}
        >
          {item.datetime}
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
          <Rating
            type="custom"
            ratingCount={5}
            imageSize={20}
            startingValue={item.rating ? item.rating : 0}
            ratingColor={COLORS.red}
            ratingBackgroundColor={COLORS.grey}
            tintColor={COLORS.white}
            readonly
          />
        </View>
        <Text style={{ fontSize: 18, color: COLORS.primaryDark }}>
          "{item.comment}"
        </Text>
      </View>
    </View>
  );
};

const ReviewList = ({ items }) => {
  if (items.length === 0) {
    return (
      <Text
        style={{
          marginVertical: 40,
          marginHorizontal: 20,
          fontSize: 20,
          textAlign: "center",
          color: COLORS.greyDark,
        }}
      >
        Chưa có đánh giá nào về món ăn này.
      </Text>
    );
  }

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={items}
        renderItem={({ item }) => <ReviewItem item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    height: 600,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  reviewItem: {
    flexDirection: "row",
    paddingVertical: 20,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.grey,
    borderStyle: "dashed",
  },
  userImage: {
    height: 50,
    width: 50,
  },
  reviewInfo: {
    marginLeft: 10,
  },
});

export default ReviewList;
