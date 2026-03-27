import { StyleSheet } from "react-native";
import { colors } from "../../../../styles/globalStyles";

export const styles = StyleSheet.create({
  currentWork__status__container: {
    backgroundColor: colors.white,
    marginHorizontal: 16,
    marginTop: 14,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 20,
    elevation: 2
  },
  currentWork__status__title: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    color: colors.black,
    marginBottom: 14,
  },
  currentWork__status__row: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 14,
  },
  currentWork__status__iconContainer: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  currentWork__status__circleActive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.white,
  },
  currentWork__status__circleInactive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.white,
  },
  currentWork__status__stepTitle: {
    fontFamily: "Inter-Bold",
    fontSize: 14,
    color: colors.black,
  },
  currentWork__status__stepSubtitle: {
    fontFamily: "Inter-Normal",
    fontSize: 13,
    color: colors.gray,
    marginTop: 2,
  },
});
