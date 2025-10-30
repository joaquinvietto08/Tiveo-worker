import { StyleSheet } from "react-native";
import { colors } from "../../../../styles/globalStyles";

export const styles = StyleSheet.create({
  description__mainContainer: {
    flex: 1,
  },
  description__title: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
    color: colors.black,
    marginBottom: 4,
  },
  description__step: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
    color: colors.gray,
    marginBottom: 10,
  },
  description__progressContainer: {
    height: 4,
    backgroundColor: colors.lightGray,
    borderRadius: 2,
    marginBottom: 30,
  },
  description__progressBar: {
    width: "75%",
    height: "100%",
    backgroundColor: colors.black,
    borderRadius: 2,
  },
  description__sectionTitle: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    color: colors.black,
    marginBottom: 6,
  },
  description__sectionSubtitle: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: colors.gray,
    marginBottom: 20,
  },
  description__textArea: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontFamily: "Inter-Regular",
    fontSize: 15,
    color: colors.black,
    height: 130,
    textAlignVertical: "top",
  },
  description__charCount: {
    textAlign: "right",
    color: colors.gray,
    fontSize: 12,
    fontFamily: "Inter-Regular",
    marginTop: 6,
  },
  description__buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 219,
    marginBottom: 40,
  },
  description__backButton: {
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 35,
  },
  description__backButtonText: {
    color: colors.black,
    fontFamily: "Inter-SemiBold",
    fontSize: 15,
  },
  description__button: {
    backgroundColor: colors.black,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 65,
  },
  description__buttonText: {
    color: colors.white,
    fontFamily: "Inter-SemiBold",
    fontSize: 15,
  },
  placeholder: {
    color: colors.gray,
  },
});
