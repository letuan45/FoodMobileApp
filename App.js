import React, { useEffect, useState } from "react";
import { StatusBar, useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnBoardScreen from "./screens/OnBoardScreen";
import BottomNavigator from "./navigation/BottomNavigator";
import DetailScreen from "./screens/DetailScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <NavigationContainer>
      <StatusBar style={isDarkMode ? "light-content" : "default"} />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="BoardScreen" component={OnBoardScreen} />
        <Stack.Screen name="Home" component={BottomNavigator} />
        <Stack.Screen name="DetailScreen" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
