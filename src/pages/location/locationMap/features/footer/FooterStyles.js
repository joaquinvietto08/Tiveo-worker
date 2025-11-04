import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  locationMap__footer__title: {
    fontFamily: "Inter-Bold",
    fontSize: 20,
    paddingLeft: 20,
  },
  locationMap__footer__addressContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  locationMap__footer__subContainer: {
    marginTop: 10,
    marginBottom: 25,
    width: "100%",
    borderWidth: 1,
    borderColor: "#C8C8C8",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 6,
  },
  locationMap__footer__text: {
    fontFamily: "Inter-Medium",
    color: "#848484",
  },
  locationMap__footer__confirmText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
