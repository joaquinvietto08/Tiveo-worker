import { StyleSheet } from "react-native";
import { colors } from "../../../styles/globalStyles";

export const styles = StyleSheet.create({
  inputs__loadingButton__overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
  },
  inputs__loadingButton__progressWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  inputs__loadingButton__progressText: {
    color: colors.white,
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
    position: "absolute",
  },
  inputs__loadingButton__button: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
  },
  inputs__loadingButton__text: {
    color: colors.white,
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
  },
});
