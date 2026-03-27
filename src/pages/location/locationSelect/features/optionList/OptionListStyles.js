import { StyleSheet } from "react-native";
import { colors } from "../../../../../styles/globalStyles";

export const styles = StyleSheet.create({
  locationSelect__optionList__container: {
    paddingHorizontal: 20,
    paddingTop: 0,
    flex: 1,
  },
  locationSelect__optionList__defaultContainer: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "#C8C8C8",
    flexDirection: "row",
    alignItems: "center",
  },
  locationSelect__optionList__iconContainer: {
    width: 20,
    alignItems: "center",
  },
  locationSelect__optionList__optionName: {
    fontFamily: "Inter-Medium",
    fontSize: 15,
  },
  locationSelect__optionList__subContainer: {
    marginLeft: 10,
  },
  locationSelect__optionList__addressContainer: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "#C8C8C8",
    flexDirection: "row",
    flex: 1,
  },
  locationSelect__optionList__addressName: {
    fontFamily: "Inter-Medium",
    fontSize: 15,
  },
  locationSelect__optionList__addressDetails: {
    fontFamily: "Inter-Medium",
    fontSize: 13,
    color: colors.gray,
  },
});
