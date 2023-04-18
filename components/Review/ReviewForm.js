import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { Rating } from "react-native-ratings";
import COLORS from "../../consts/colors";
import PrimaryButtonSmall from "../../components/UI/Buttons/PrimaryButtonSmall";
import ShowToast from "../../utils/ShowToast";
import { reviewProduct } from "../../services/ReviewService";

const ReviewForm = ({ onClose, onReload, productId, orderId }) => {
  const [ratingValue, setRatingValue] = useState(0);
  const [comment, setComment] = useState("");
  const { reviewResponse, reviewError, reviewIsLoading, callReview } =
    reviewProduct();

  useEffect(() => {
    if (reviewResponse) {
      ShowToast(reviewResponse.message);
      onClose();
      onReload();
    } else if (reviewError) {
      ShowToast(reviewError.data.message);
    }
  }, [reviewResponse, reviewError]);

  const ratingCompleted = (rating) => {
    setRatingValue(rating);
  };

  const handleSubmitReview = () => {
    const commentValue = comment.trim();
    if (ratingValue === 0 || commentValue === "") {
      ShowToast("Xin hãy nhập đầy đủ thông tin đánh giá!");
      return;
    } else {
      callReview({
        productId: productId,
        reviewScore: ratingValue,
        comment: commentValue,
        orderId: orderId,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.votingLabel}>Điểm vote:</Text>
        <Rating
          type="custom"
          ratingCount={5}
          imageSize={40}
          startingValue={0}
          ratingColor={COLORS.red}
          ratingBackgroundColor={COLORS.grey}
          tintColor={COLORS.white}
          onFinishRating={ratingCompleted}
        />
      </View>
      <View>
        <Text style={styles.votingLabel}>Bình luận:</Text>
        <TextInput
          value={comment}
          onChangeText={(value) => {
            setComment(value);
          }}
          placeholder="Nhập bình luận"
          multiline={true}
          numberOfLines={4}
          textAlignVertical="top"
          style={styles.commentInput}
        />
      </View>
      <View>
        <PrimaryButtonSmall
          isLoading={reviewIsLoading}
          title="Xác nhận"
          onPress={handleSubmitReview}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  votingLabel: {
    fontSize: 20,
    fontWeight: 600,
  },
  commentInput: {
    backgroundColor: COLORS.greyLight,
    padding: 16,
    fontSize: 16,
    marginTop: 6,
    borderRadius: 12,
    marginBottom: 18,
  },
});

export default ReviewForm;
