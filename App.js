import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Root from "./src/routes/Root";
import "react-native-get-random-values";
import { UserProvider } from "./src/context/UserContext";
import { LocationProvider } from "./src/context/LocationContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <UserProvider>
        <LocationProvider>
          <StatusBar style="dark" />
          <Root />
        </LocationProvider>
      </UserProvider>
    </SafeAreaProvider>
  );
}
