import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboarding from "../pages/onboarding/Onboarding";

const Stack = createNativeStackNavigator();

const Root = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          gestureEnabled: true,
        }}
      >
        <>
          <Stack.Screen name="Onboarding" component={Onboarding} />
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Root;
