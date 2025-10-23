import { StyleSheet } from "react-native";
import { colors } from "../../../../styles/globalStyles";

export const styles = StyleSheet.create({
  home__stats__container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    backgroundColor: colors.white,
  },

  home__stats__item: {
    flex: 1,
    alignItems: "center",
  },

  home__stats__number: {
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
    color: colors.black,
  },

  home__stats__label: {
    marginTop: 2,
    fontSize: 12,
    color: colors.gray,
    fontFamily: "Inter-Normal",
  },
});
