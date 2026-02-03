import React from "react";
import { View, Text, StyleSheet, StatusBar, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Tiveo from "../../../assets/svgs/tiveo";
import { colors } from "../../styles/globalStyles";

const Welcome = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        ...styles.mainContainer,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <View style={styles.circle1} />
      <View style={styles.circle2} />
      <View style={styles.container}>
        <Tiveo style={styles.appLogo} />
        <Text style={styles.subtitle}>
          Trabajá a tu manera{"\n"}Nosotros te conectamos
        </Text>
        <Pressable
          style={styles.startButton}
          onPress={() => navigation.navigate("Login")}
          color={colors.primary}
        >
          <Text
            style={{ fontSize: 16, fontFamily: "Inter-Medium", color: "#fff" }}
          >
            Comenzar
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.background,
    flex: 1,
  },

  circle1: {
    position: "absolute",
    top: -230,
    left: -50,
    width: 450,
    height: 450,
    backgroundColor: "rgba(0, 0, 0, 0.41)",
    borderRadius: 300,
  },
  circle2: {
    position: "absolute",
    top: -175,
    left: 207,
    width: 342,
    height: 342,
    backgroundColor: "rgba(0, 0, 0, 0.43)",
    borderRadius: 200,
  },
  container: {
    marginTop: 240,
    alignItems: "center",
    flex: 1,
    paddingBottom: 70,
    paddingHorizontal: 20,
  },
  appLogo: {
    marginBottom: 40,
  },
  subtitle: {
    fontFamily: "Inter-Regular",
    fontSize: 18,
    textAlign: "center",
    width: "80%",
  },
  startButton: {
    marginTop: "auto",
    backgroundColor: colors.black,
    width: "100%",
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
