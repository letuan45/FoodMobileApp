import {
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  Text,
} from "react-native";
import COLORS from "../../../consts/colors";
import Z_INDEXES from "../../../consts/zIndexes";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const MODAL_HEIGHT = 150;

const CustomDialog = (props) => {
  const handleAgreement = () => {
    props.onAgree(props.itemId);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backDrop} onPress={props.onClose} />
      <View style={styles.modal}>
        <Text style={styles.header}>{props.title}</Text>
        <Text style={styles.dialogContent}>{props.content}</Text>
        <View style={styles.dialogControls}>
          <TouchableOpacity style={styles.dialogButton} onPress={props.onClose}>
            <Text style={styles.dialogBtnContent}>Hủy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dialogButton}
            onPress={handleAgreement}
          >
            <Text style={styles.dialogBtnContent}>Xác nhận</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 0,
    left: 0,
    flex: 1,
    width: WIDTH,
    height: HEIGHT,
    position: "absolute",
    zIndex: Z_INDEXES.biggest,
    justifyContent: "center",
    alignItems: "center",
  },
  backDrop: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: Z_INDEXES.backDrop,
    backgroundColor: "black",
    opacity: 0.8,
  },
  modal: {
    height: MODAL_HEIGHT,
    backgroundColor: COLORS.white,
    zIndex: Z_INDEXES.biggest,
    borderRadius: 10,
    opacity: 1,
    width: WIDTH - 80,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  header: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
  },
  dialogContent: {
    flex: 2,
    fontSize: 16,
    textAlign: "center",
  },
  dialogControls: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  dialogButton: {
    flex: 1,
  },
  dialogBtnContent: {
    fontSize: 18,
    textAlign: "center",
    color: COLORS.orange,
  },
});

export default CustomDialog;
