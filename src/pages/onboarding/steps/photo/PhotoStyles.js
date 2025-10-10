import { StyleSheet } from "react-native";
import { colors } from "../../../../styles/globalStyles";

export const styles = StyleSheet.create({
  photo__mainContainer: {
    flex: 1,
  },
  photo__title: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
    color: colors.black,
    marginBottom: 4,
  },
  photo__step: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
    color: colors.gray,
    marginBottom: 10,
  },
  photo__progressContainer: {
    height: 4,
    backgroundColor: colors.lightGray,
    borderRadius: 2,
    marginBottom: 30,
  },
  photo__progressBar: {
    width: "50%",
    height: "100%",
    backgroundColor: colors.black,
    borderRadius: 2,
  },
  photo__sectionTitle: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    color: colors.black,
    marginBottom: 6,
  },
  photo__sectionSubtitle: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: colors.gray,
    marginBottom: 40,
  },
  photo__photoContainer: {
    width: 180,
    height: 180,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: colors.lightGray,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: colors.white,
    marginBottom: 40,
  },
  photo__photo: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  photo__photoPlaceholder: {
    color: colors.gray,
    fontFamily: "Inter-Medium",
  },
  photo__buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "auto",
  },
  photo__backButton: {
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 35,
  },
  photo__backButtonText: {
    color: colors.black,
    fontFamily: "Inter-SemiBold",
    fontSize: 15,
  },
  photo__button: {
    backgroundColor: colors.black,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 65,
  },
  photo__buttonText: {
    color: colors.white,
    fontFamily: "Inter-SemiBold",
    fontSize: 15,
  },
});
