import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../consts/colors";
import { View } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import CartScreen from "../screens/CartScreen";

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        style: { height: 55, boderTopWidth: 0, evelation: 0 },
        tabBarShowLabel: false,
        tabBarActiveTintColor: COLORS.primary,
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
          tabBarIcon: ({ color }) => (
            <Icon name="shopping-cart" color={color} size={28} />
          ),
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
                borderColor: COLORS.primary,
                borderWidth: 2,
                borderRadius: 30,
                top: -20,
                elevation: 5
              }}
            >
              <Icon name="search" color={COLORS.primary} size={28} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Order"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="local-mall" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="WishList"
        component={HomeScreen}
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
