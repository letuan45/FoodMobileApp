import { StyleSheet, Image, View, Text, SafeAreaView } from "react-native";
import COLORS from "../consts/colors";
import PrimaryButton from "../components/UI/Buttons/PrimaryButton";
import Logo from "../components/UI/Decorations/Logo";

const OnBoardScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backDrop} />
      <Image
        style={styles.image}
        source={require("../assets/images/background_onboard.jpg")}
      />
      <View style={styles.logoContainer}>
        <Logo/>
      </View>
      <View style={styles.contentWrapper}>
        <Text style={styles.headerText}>Chào mừng</Text>
        <Text style={styles.headerText}>Đến với Poco!</Text>
        <Text style={styles.intro}>
          Trải nghiệm dịch vụ đặt đồ ăn online cùng với nhiều ưu đãi hấp dẫn
          dành cho bạn cùng chúng tôi! Hãy bắt đầu!
        </Text>
        <PrimaryButton
          title="Bắt đầu"
          onPress={() => navigation.navigate("Home")}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.red,
  },
  image: {
    position: "absolute",
    top: -340,
    left: 0,
    width: "100%",
    resizeMode: "cover",
    backgroundColor: COLORS.black,
    zIndex: -2,
  },
  backDrop: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.black,
    opacity: 0.6,
    zIndex: -1,
  },
  headerText: {
    color: COLORS.white,
    fontSize: 50,
    fontWeight: "bold",
  },
  contentWrapper: {
    flex: 1,
    zIndex: 1,
    padding: 20,
    marginTop: 120,
  },
  logoContainer: {
    flex: 1,
    marginTop: 20,
    marginLeft: 20
  },
  intro: {
    fontSize: 18,
    color: COLORS.greyLight,
    marginVertical: 14,
  },
});

export default OnBoardScreen;
