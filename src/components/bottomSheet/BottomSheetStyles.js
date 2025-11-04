import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  bottomSheet__absoluteContainer: {
    bottom: 0,
    width: "100%",
    justifyContent: "flex-end",
    zIndex: 10,
  },
  bottomSheet__overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
