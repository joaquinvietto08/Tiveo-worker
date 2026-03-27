import React from "react";
import LocationSelect from "../pages/location/locationSelect/LocationSelect";
import LocationMap from "../pages/location/locationMap/LocationMap";
import SaveAddress from "../pages/location/saveAddress/SaveAddress";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

function LocationRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LocationSelect" component={LocationSelect} />
      <Stack.Screen name="LocationMap" component={LocationMap} />
      <Stack.Screen name="SaveAddress" component={SaveAddress} />
    </Stack.Navigator>
  );
}

export default LocationRoutes;
