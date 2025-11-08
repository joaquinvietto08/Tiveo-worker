import { StyleSheet } from "react-native";
import { colors } from "../../styles/globalStyles";

export const styles = StyleSheet.create({
  profile__container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  profile__header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingTop: 20
  },
  profile__backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.lightGray,
  },
  profile__headerTitle: {
    flex: 1,
    fontSize: 20,
    paddingLeft: 68,
    fontFamily: "Inter-Medium",
    color: colors.black,
  },
  profile__content: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: "center",
  },
  profile__avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 16,
  },
  profile__name: {
    fontSize: 22,
    fontFamily: "Inter-Medium",
    color: colors.black,
  },
  profile__workerName: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: colors.gray,
    marginTop: 4,
    marginBottom: 24,
  },
  profile__card: {
    width: "100%",
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  profile__section: {
    marginBottom: 16,
  },
  profile__sectionLabel: {
    fontSize: 14,
    fontFamily: "Inter-Normal",
    color: colors.gray,
    marginBottom: 4,
  },
  profile__sectionValue: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: colors.black,
  },
  profile__description: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: colors.black,
    lineHeight: 22,
  },
  profile__emptyText: {
    fontSize: 15,
    fontFamily: "Inter-Regular",
    color: colors.gray,
  },
  profile__servicesList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4
  },
  profile__serviceChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  profile__serviceChipText: {
    fontFamily: "Inter-Normal",
    fontSize: 16,
    color: colors.black,
    marginLeft: 4,
  },
  profile__editButton: {
    marginTop: 8,
    width: "100%",
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 12,
  },
  profile__editButtonText: {
    fontSize: 16,
    fontFamily: "Inter-Medium",
    color: colors.white,
  },
  profile__logoutButton: {
    marginTop: 24,
    width: "60%",
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  profile__logoutButtonText: {
    fontSize: 16,
    fontFamily: "Inter-Medium",
    color: colors.black,
  },
  profile__loaderContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
});
