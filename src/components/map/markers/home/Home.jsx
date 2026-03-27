import React from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import HomeMarker from "./homeMarker.svg";

const Home = () => {
  return (
    <View style={styles.container}>
      <HomeMarker />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Home;
