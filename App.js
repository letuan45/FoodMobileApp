import React, { useEffect, useState } from "react";
import { StatusBar, useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnBoardScreen from "./screens/OnBoardScreen";
import BottomNavigator from "./navigation/BottomNavigator";
import DetailScreen from "./screens/DetailScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import OrderDetailScreen from "./screens/OrderDetailScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginSuccessScreen from "./screens/LoginSuccessScreen";
import AccountScreen from "./screens/AccountScreen";
import { Provider } from "react-redux";
import store from "./store";
import CheckoutSuccessScreen from "./screens/CheckoutSuccessScreen";
import ViewReviewsScreen from "./screens/ViewReviewsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar style={isDarkMode ? "light-content" : "default"} />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="BoardScreen" component={OnBoardScreen} />
          <Stack.Screen name="Home" component={BottomNavigator} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="DetailScreen" component={DetailScreen} />
          <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
          <Stack.Screen
            name="OrderDetailScreen"
            component={OrderDetailScreen}
          />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen
            name="LoginSuccessScreen"
            component={LoginSuccessScreen}
          />
          <Stack.Screen name="AccountScreen" component={AccountScreen} />
          <Stack.Screen
            name="CheckoutSuccessScreen"
            component={CheckoutSuccessScreen}
          />
          <Stack.Screen
            name="ViewReviewsScreen"
            component={ViewReviewsScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
