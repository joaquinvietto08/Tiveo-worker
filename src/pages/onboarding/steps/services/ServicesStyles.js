import { StyleSheet } from "react-native";
import { colors } from "../../../../styles/globalStyles";

export const styles = StyleSheet.create({
  onboardingServices__mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
  },
  onboardingServices__title: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
    color: colors.black,
    marginBottom: 4,
  },
  onboardingServices__step: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
    color: colors.gray,
    marginBottom: 10,
  },
  onboardingServices__progressContainer: {
    height: 4,
    backgroundColor: colors.lightGray,
    borderRadius: 2,
    marginBottom: 30,
  },
  onboardingServices__progressBar: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.black,
    borderRadius: 2,
  },
  onboardingServices__sectionTitle: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    color: colors.black,
    marginBottom: 6,
  },
  onboardingServices__sectionSubtitle: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: colors.gray,
    marginBottom: 20,
  },
  onboardingServices__option: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  onboardingServices__optionSelected: {
    backgroundColor: colors.black,
    borderColor: colors.black,
  },
  onboardingServices__optionText: {
    color: colors.black,
    fontFamily: "Inter-Regular",
    fontSize: 15,
  },
  onboardingServices__optionTextSelected: {
    color: colors.white,
    fontFamily: "Inter-SemiBold",
  },
  onboardingServices__button: {
    backgroundColor: colors.black,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: "auto",
  },
  onboardingServices__buttonText: {
    color: colors.white,
    fontFamily: "Inter-SemiBold",
    fontSize: 15,
  },
});
