import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboarding from "../pages/onboarding/Onboarding";
import Home from "../pages/home/Home";
import JobApply from "../pages/jobApply/JobApply";
import CurrentWork from "../pages/currentWork/CurrentWork";
import Messages from "../pages/messages/Messages";
import { UserContext } from "../context/UserContext";
import AuthRoutes from "./AuthRoutes";
import Loading from "../components/loading/Loading";

const Stack = createNativeStackNavigator();

const Root = () => {
  const { user, loading } = useContext(UserContext);

/*   if (loading) return <Loading />; 
 */
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          gestureEnabled: true,
        }}
      >
        {user ? (
          <>
            {user?.description ? (
              <>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="JobApply" component={JobApply} />
                <Stack.Screen name="CurrentWork" component={CurrentWork} />
                <Stack.Screen name="Messages" component={Messages} />
              </>
            ) : (
              <Stack.Screen name="Onboarding" component={Onboarding} />
            )}
          </>
        ) : (
          <Stack.Screen name="Auth" component={AuthRoutes} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Root;
