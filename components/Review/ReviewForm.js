import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Rating } from "react-native-ratings";
import COLORS from "../../consts/colors";
import PrimaryButtonSmall from "../../components/UI/Buttons/PrimaryButtonSmall";
import ShowToast from "../../utils/ShowToast";
import { reviewProduct } from "../../services/ReviewService";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";

const ReviewForm = ({ onClose, onReload, productId, orderId }) => {
  const [ratingValue, setRatingValue] = useState(0);
  const [comment, setComment] = useState("");
  const { reviewResponse, reviewError, reviewIsLoading, callReview } =
    reviewProduct();
  const [image, setImage] = useState(null);

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
        imageURL: image
      });
    }
  };

  const uploadImageHandler = async () => {
    if(Platform.OS !== "web") {
      const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if(status !== "granted") {
        alert("Không thể cấp quyền!");
        setImage(null);
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [5,4],
        quality: 1
      })

      if(!result.canceled) {
        setImage(result.assets[0].uri);
      }
    }
  }

  const cancelUploadImage = () => {
    setImage(null);
  }

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
        <Text style={styles.votingLabel}>Hình ảnh (nếu có):</Text>
        <View style={styles.imageBtnContainer}>
          <TouchableOpacity onPress={uploadImageHandler}>
            <View style={{ alignItems: "center", marginTop: 10 }}>
              <View style={{ ...styles.uploadImageBtn, marginRight: 10 }}>
                <Icon name="photo-camera" size={28} color={COLORS.white} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={cancelUploadImage}>
            <View style={{ alignItems: "center", marginTop: 10 }}>
              <View
                style={{
                  ...styles.uploadImageBtn,
                  backgroundColor: COLORS.red,
                }}
              >
                <Icon name="no-photography" size={28} color={COLORS.white} />
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: "center", marginBottom: 10 }}>
          <Image
            style={styles.reviewImage}
            source={{
              uri: image,
            }}
          />
        </View>
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
  reviewImage: {
    marginTop: 10,
    width: 100,
    height: 100,
  },
  uploadImageBtn: {
    backgroundColor: COLORS.green,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    width: 80,
    alignItems: "center",
  },
  imageBtnContainer: {
    flexDirection: "row",
    justifyContent: "center",
  }
});

export default ReviewForm;
