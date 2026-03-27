import { StyleSheet } from "react-native";
import { colors } from "../../styles/globalStyles";

export const styles = StyleSheet.create({
  LoadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.black,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
});
