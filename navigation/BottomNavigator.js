import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../consts/colors";
import { View } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import CartScreen from "../screens/CartScreen";
import OrdersScreen from "../screens/OrdersScreen";
import WishlistScreen from "../screens/WishlistScreen";
import variables from "../consts/variables";
import { getCart } from "../services/CartService";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { cartActions, wishListActions} from "../store";
import CartLogo from "../components/UI/Decorations/CartLogo";
import { getWishlist } from "../services/WishlistService";
import ShowToast from "../utils/ShowToast";

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  const dispatch = useDispatch();
  const { getCartRes, getCartErr, callGetCart } = getCart();
  const { wishlistRes, wishlistError, callGetWishlist } = getWishlist();
  const user = useSelector((state) => state.auth.user);

  //Lấy Cart, Wishlish sau khi đăng nhập
  useEffect(() => {
    if (user) {
      callGetCart();
      callGetWishlist();
    }
  }, [user]);

  useEffect(() => {
    if (wishlistRes) {
      dispatch(wishListActions.replaceWishList({ items: wishlistRes }));
    } else if(wishlistError) {
      ShowToast(wishlistError.data.message);
    }
  }, [wishlistRes, wishlistError]);

  useEffect(() => {
    if (getCartRes) {
      dispatch(cartActions.replaceCart({ items: getCartRes.itemList }));
    } else if (getCartErr) {
      ShowToast(getCartErr.data.message);
    }
  }, [getCartRes, getCartErr]);

  return (
    <Tab.Navigator
      screenOptions={{
        style: {
          height: variables.bottomNavigateHeight,
          boderTopWidth: 0,
          evelation: 0,
        },
        tabBarStyle: {
          backgroundColor: COLORS.orange,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: COLORS.greenDark,
        tabBarInactiveTintColor: COLORS.white,
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="home-filled" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <CartLogo color={color} />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <View
              style={{
                height: 60,
                width: 60,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: COLORS.white,
                borderColor: COLORS.orange,
                borderWidth: 2,
                borderRadius: 30,
                top: -20,
                elevation: 5,
              }}
            >
              <Icon name="search" color={COLORS.orange} size={28} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Order"
        component={OrdersScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="local-mall" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="WishList"
        component={WishlistScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="favorite" color={color} size={28} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
