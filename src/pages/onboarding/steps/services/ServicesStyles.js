import { StyleSheet } from "react-native";
import { colors } from "../../../../styles/globalStyles";

export const styles = StyleSheet.create({
  services__mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
  },
  services__title: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
    color: colors.black,
    marginBottom: 4,
  },
  services__subtitle: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: colors.gray,
    marginBottom: 20,
  },
  services__card: {
    flex: 1,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    marginBottom: 16,
    elevation: 2,
  },
  services__cardSelected: {
    borderColor: colors.black,
    backgroundColor: "#F9F9F9",
  },
  services__icon: {
    width: 40,
    height: 40,
    tintColor: colors.black,
    marginBottom: 8,
  },
  services__iconSelected: {
    tintColor: colors.black,
  },
  services__label: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
    color: colors.black,
  },
  services__labelSelected: {
    fontFamily: "Inter-SemiBold",
  },
  services__check: {
    position: "absolute",
    top: 6,
    right: 8,
    color: colors.black,
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
  },
  services__helperText: {
    textAlign: "center",
    fontSize: 12,
    color: colors.gray,
    fontFamily: "Inter-Regular",
    marginBottom: 20,
  },
  services__buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "auto",
  },
  services__backButton: {
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  services__backButtonText: {
    color: colors.black,
    fontFamily: "Inter-SemiBold",
    fontSize: 15,
  },
  services__button: {
    backgroundColor: colors.black,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  services__buttonText: {
    color: colors.white,
    fontFamily: "Inter-SemiBold",
    fontSize: 15,
  },
});
