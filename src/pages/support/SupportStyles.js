import { StyleSheet } from "react-native";
import { colors } from "../../styles/globalStyles";

export const styles = StyleSheet.create({
  support__container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    justifyContent: "flex-start",
  },
  support__title: {
    fontFamily: "Inter-Bold",
    fontSize: 26,
    paddingTop: 50,
    color: colors.black,
  },
  support__subtitle: {
    fontFamily: "Inter-Regular",
    fontSize: 15,
    color: colors.black,
    marginTop: 10,
    marginBottom: 25,
  },
  support__input: {
    height: 160,
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 8,
    padding: 10,
    fontFamily: "Inter-Regular",
    fontSize: 15,
    color: colors.black,
    backgroundColor: colors.white,
  },
  support__buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  support__button: {
    width: "47%",
    height: 45,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  support__cancel: {},
  support__cancelText: {
    color: colors.black,
    fontFamily: "Inter-Medium",
    fontSize: 16,
  },
  support__send: {
    backgroundColor: colors.primary,
  },
  support__sendText: {
    color: colors.black,
    fontFamily: "Inter-Medium",
    fontSize: 16,
  },
  support__disabled: {
    opacity: 0.5,
  },
  support__confirmation: {
    flex: 1,
    position: "absolute",
    bottom: 50,
    right: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  support__confirmationText: {
    fontFamily: "Inter-Bold",
    fontSize: 17,
    backgroundColor: colors.primary,
    padding: 20,
    borderRadius: 8,
    color: colors.white,
    textAlign: "center",
  },
});
