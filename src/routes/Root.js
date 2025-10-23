import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as NavigationBar from "expo-navigation-bar";
import Onboarding from "../pages/onboarding/Onboarding";
import Home from "../pages/home/Home";
import JobApply from "../pages/jobApply/JobApply";
import CurrentWork from "../pages/currentWork/CurrentWork";

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
          {/*<Stack.Screen name="Onboarding" component={Onboarding} />*/}
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="JobApply" component={JobApply} />
          <Stack.Screen name="CurrentWork" component={CurrentWork} />
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Root;
