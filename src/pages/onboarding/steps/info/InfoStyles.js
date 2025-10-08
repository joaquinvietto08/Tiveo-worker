import { StyleSheet } from "react-native";
import { colors } from "../../../../styles/globalStyles";

export const styles = StyleSheet.create({
  info__mainContainer: {
    flex: 1,
  },
  info__title: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
    color: colors.black,
    marginBottom: 4,
  },
  info__step: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
    color: colors.gray,
    marginBottom: 10,
  },
  info__progressContainer: {
    height: 4,
    backgroundColor: colors.lightGray,
    borderRadius: 2,
    marginBottom: 30,
  },
  info__progressBar: {
    width: "25%",
    height: "100%",
    backgroundColor: colors.black,
    borderRadius: 2,
  },
  info__sectionTitle: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    color: colors.black,
    marginBottom: 6,
  },
  info__sectionSubtitle: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: colors.gray,
    marginBottom: 20,
  },
  info__label: {
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
    color: colors.black,
    marginBottom: 6,
  },
  info__input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 14,
    fontFamily: "Inter-Regular",
    fontSize: 15,
    color: colors.black,
  },
  info__helperText: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    color: colors.gray,
    marginTop: -8,
    marginBottom: 18,
  },
  info__button: {
    backgroundColor: colors.black,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: "auto",
  },
  info__buttonText: {
    color: colors.white,
    fontFamily: "Inter-SemiBold",
    fontSize: 15,
  },
  placeholder: {
    color: colors.gray,
  },
});
