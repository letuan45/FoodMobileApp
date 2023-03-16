import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Image,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Categories from "../components/Categories";
import Logo from "../components/UI/Logo";
import COLORS from "../consts/colors";
import PrimaryButtonSmall from "../components/UI/PrimaryButtonSmall";
import ShopList from "../components/Shop/ShopList";

const HomeScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View>
            <Logo />
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <Text style={{ fontSize: 28 }}>Xin chào, </Text>
              <Text style={{ fontSize: 28, fontWeight: "bold" }}>Tuấn</Text>
            </View>
            <Text style={styles.headerHint}>Hãy chọn món ăn bạn muốn</Text>
          </View>
          <TouchableHighlight>
            <Image
              style={styles.userImage}
              source={require("../assets/icons/user.png")}
            />
          </TouchableHighlight>
        </View>
        <TouchableHighlight style={styles.searchContainer}>
          <View>
            <Icon name="search" size={28} />
          </View>
        </TouchableHighlight>
        <Categories />
        <View style={styles.banner}>
          <Image
            style={styles.bannerImage}
            source={require("../assets/images/h5_bn-1.png")}
          />
          <View style={styles.bannerContainer}>
            <View style={styles.bannerContent}>
              <Text style={styles.bannerHeader}>Đặt hàng ngay</Text>
              <Text style={styles.bannerDisc}>
                Giao hàng nội thành trong vòng tối đa 1 giờ
              </Text>
              <View style={{ marginTop: 12, width: 124 }}>
                <PrimaryButtonSmall title="Đặt ngay" />
              </View>
            </View>
            <Image
              style={styles.bannerPizza}
              source={require("../assets/images/h5_bn-2-1.png")}
            />
          </View>
        </View>
        <Text style={styles.menuHeader}>Thực đơn</Text>
        <ShopList navigation={navigation}/>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  headerHint: {
    fontSize: 20,
    marginTop: 5,
    color: COLORS.grey,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  searchContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    backgroundColor: COLORS.greyLight,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  banner: {
    marginHorizontal: 20,
  },
  bannerImage: {
    width: "100%",
    height: 180,
    borderRadius: 14,
    resizeMode: "contain",
  },
  bannerContainer: {
    borderRadius: 14,
    position: "absolute",
    top: 0,
    left: 0,
    flex: 1,
    width: "100%",
    height: "100%",
  },
  bannerContent: {
    width: "48%",
    marginHorizontal: 32,
    marginVertical: 20,
    position: "absolute",
    zIndex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  bannerPizza: {
    width: 180,
    resizeMode: "contain",
    height: 120,
    position: "absolute",
    right: 10,
    top: 36,
    zIndex: -1,
  },
  bannerHeader: {
    color: COLORS.white,
    fontSize: 26,
    fontWeight: "bold",
  },
  bannerDisc: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 600,
  },
  menuHeader: {
    fontSize: 24,
    fontWeight: 600,
    marginTop: 18,
    marginHorizontal: 20
  }
});

export default HomeScreen;
