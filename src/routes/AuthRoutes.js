import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "../pages/auth/Welcome";
import Login from "../pages/auth/Login";

const Stack = createNativeStackNavigator();

const AuthRoutes = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default AuthRoutes;
