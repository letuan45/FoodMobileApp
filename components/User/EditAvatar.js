import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import COLORS from "../../consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import LoadingSpinner from "../../components/UI/Interactors/LoadingSpinner";
import { changeAvatar } from "../../services/UserService";
import ShowToast from "../../utils/ShowToast";
import PrimaryButtonSmall from "../UI/Buttons/PrimaryButtonSmall";

const EditAvatar = ({ onClose }) => {
  const [image, setImage] = useState(null);
  const {
    changeAvatarResponse,
    changeAvatarError,
    changeAvatarIsLoading,
    callReview,
  } = changeAvatar();

  useEffect(() => {
    if (changeAvatarResponse) {
      ShowToast(changeAvatarResponse.message + ", hãy đăng nhập lại");
      onClose();
    } else if (changeAvatarError) {
      ShowToast(changeAvatarError.data.message);
    }
  }, [changeAvatarResponse, changeAvatarError]);

  const uploadImageHandler = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Không thể cấp quyền!");
        setImage(null);
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [5, 4],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    }
  };

  const cancelUploadImage = () => {
    setImage(null);
  };

  const handleConfirm = () => {
    if (!image) {
      ShowToast("Hãy chọn hình ảnh");
      return;
    }
    callReview({ imageURL: image });
  };

  return (
    <View style={{ position: "relative" }}>
      {changeAvatarIsLoading && (
        <View
          style={{
            position: "absolute",
            top: -40,
            width: 30,
            height: 30,
            left: 70,
          }}
        >
          <LoadingSpinner />
        </View>
      )}
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
      <PrimaryButtonSmall title="Xác nhận" onPress={handleConfirm} />
    </View>
  );
};

const styles = StyleSheet.create({
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
  },
});

export default EditAvatar;
