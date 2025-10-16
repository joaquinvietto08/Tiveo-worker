import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as NavigationBar from "expo-navigation-bar";
import Root from "./src/routes/Root";
import { UserProvider } from "./src/context/UserContext";

export default function App() {
  // Color de la barra de navegación (abajo)

  // Cambia el color de los íconos (light = íconos claros, dark = íconos oscuros)
  return (
    <SafeAreaProvider>
      <UserProvider>
        <StatusBar style="dark" />
        <Root />
      </UserProvider>
    </SafeAreaProvider>
  );
}
