import { StyleSheet } from "react-native";
import { colors } from "../../../styles/globalStyles";

export const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.background,
    flex: 1,
  },
  locationSelect__header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: "flex-end",
  },
  locationSelect__headerButton: {
    paddingLeft: 20,
    paddingVertical: 10,
  },
  locationSelect__headerText: {
    fontFamily: "Inter-SemiBold",
    textDecorationLine: "underline",
  },
  locationSelect__container: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  locationSelect__title: {
    fontFamily: "Inter-Bold",
    fontSize: 24,
    marginBottom: 5,
  },
  locationSelect__subtitle: {
    fontFamily: "Inter-SemiBold",
    fontSize: 13,
    color: colors.gray,
  },
  locationSelect__errorContainer: {
    position: "absolute",
    bottom: 50,
    left: 50,
    right: 50,
    backgroundColor: "#FF5656",
    padding: 10,
    alignItems: "center",
    height: 50,
    justifyContent: "center",
    borderRadius: 5,
  },
  locationSelect__errorText: {
    color: "white",
    fontFamily: "Inter-Bold",
  },
});
