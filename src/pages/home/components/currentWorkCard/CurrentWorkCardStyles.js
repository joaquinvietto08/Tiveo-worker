import { StyleSheet } from "react-native";
import { colors } from "../../../../styles/globalStyles";

export const styles = StyleSheet.create({
  home__currentWork__container: {
    backgroundColor: colors.primary,
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginHorizontal: 16,
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  home__currentWork__left: {
    position: "absolute",
    top: 12,
    left: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  home__currentWork__statusDot: {
    width: 8,
    height: 8,
    borderRadius: 50,
    backgroundColor: colors.white,
    marginRight: 6,
  },
  home__currentWork__statusText: {
    color: colors.white,
    fontFamily: "Inter-Bold",
    fontSize: 13,
    alignSelf: "stretch",
    textAlign: "center",
  },
  home__currentWork__info: {
    flex: 1,
    marginLeft: 4,
    paddingTop: 15,
  },
  home__currentWork__title: {
    color: colors.white,
    fontFamily: "Inter-Bold",
    fontSize: 17,
    marginBottom: 4,
    alignSelf: "stretch",
    textAlign: "left",
  },
  home__currentWork__client: {
    color: colors.white,
    fontFamily: "Inter-Normal",
    fontSize: 14,
  },
  home__currentWork__locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  home__currentWork__locationText: {
    color: colors.white,
    fontFamily: "Inter-Normal",
    fontSize: 13,
    marginLeft: 4,
  },
  home__currentWork__arrow: {
    marginLeft: 10,
  },
});
