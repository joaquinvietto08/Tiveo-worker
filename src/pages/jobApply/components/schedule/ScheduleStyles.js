import { StyleSheet } from "react-native";
import { colors } from "../../../../styles/globalStyles";

export const styles = StyleSheet.create({
  jobApply__schedule__alertBox: {
    backgroundColor: "#FFF7E5",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.primary,
    padding: 16,
    marginBottom: 20,
  },

  jobApply__schedule__alertTitle: {
    color: colors.black,
    marginLeft: 8,
    fontFamily: "Inter-SemiBold",
  },

  jobApply__schedule__alertSubtitle: {
    color: colors.black,
    fontSize: 13,
    fontFamily: "Inter-Normal",
  },

  jobApply__schedule__dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    justifyContent: "center",
    paddingRight: 20,
    gap: 8,
  },

  jobApply__schedule__momentRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },

  jobApply__schedule__dateColumn: {
    alignItems: "center",
  },

  jobApply__schedule__dateTextBold: {
    fontSize: 15,
    color: colors.black,
    fontFamily: "Inter-Bold",
  },

  jobApply__schedule__dateText: {
    color: colors.black,
    fontSize: 13,
    fontFamily: "Inter-Bold",
  },

  jobApply__schedule__divider: {
    width: 1,
    height: 35,
    backgroundColor: colors.gray,
  },

  jobApply__schedule__dateTime: {
    fontSize: 15,
    color: colors.black,
    fontFamily: "Inter-Bold",
  },
  jobApply__schedule__checkboxRow: {
    flexDirection: "row",
    marginTop: 12,
    marginBottom: 10,
    alignItems: "center",
    gap: 10,
  },

  jobApply__schedule__checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1.6,
    borderColor: colors.lightGray,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },

  jobApply__schedule__checkboxActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
});
