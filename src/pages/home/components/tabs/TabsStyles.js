import { StyleSheet } from "react-native";
import { colors } from "../../../../styles/globalStyles";

export const styles = StyleSheet.create({
  home__tabs__mainContainer: {
    backgroundColor: colors.background,
  },
  home__tabs__container: {
    flexDirection: "row",
    backgroundColor: colors.lightGray,
    borderRadius: 50,
    padding: 4,
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 12,
    justifyContent: "space-between",
  },
  home__tabs__button: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 50,
  },
  home__tabs__button__active: {
    backgroundColor: colors.white,
    shadowColor: "#000",
    elevation: 1,
  },
  home__tabs__text: {
    fontFamily: "Inter-Medium",
    color: colors.black,
    fontSize: 13,
    alignSelf: "stretch",
    textAlign: "center",
  },
  home__tabs__text__active: {
    fontFamily: "Inter-SemiBold",
  },
});
