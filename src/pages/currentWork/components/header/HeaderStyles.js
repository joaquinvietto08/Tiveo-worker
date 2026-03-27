import { StyleSheet } from "react-native";
import { colors } from "../../../../styles/globalStyles";

export const styles = StyleSheet.create({
  currentWork__header__container: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  currentWork__header__topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 10,
  },
  currentWork__header__title: {
    fontFamily: "Inter-Bold",
    fontSize: 18,
    color: colors.black,
  },
  currentWork__header__statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  currentWork__header__statusDot: {
    width: 10,
    height: 10,
    borderRadius: 10,
  },
  currentWork__header__statusText: {
    fontFamily: "Inter-Normal",
    fontSize: 14,
    color: colors.gray,
  },
});
