import { StyleSheet } from "react-native";
import { colors } from "../../../../styles/globalStyles";

export const styles = StyleSheet.create({
    jobApply__body__sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.black,
    marginBottom: 6,
    fontFamily: "Inter-Normal",
  },
  jobApply__body__inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 10,
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    marginBottom: 6,
  },

  jobApply__body__currency: {
    fontSize: 16,
    color: colors.black,
    marginRight: 4,
    fontWeight: "600",
  },

  jobApply__body__input: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 10,
    color: colors.black,
  },

  jobApply__body__inputHelper: {
    fontSize: 13,
    color: colors.gray,
    marginBottom: 16,
    fontFamily: "Inter-Normal",
  },

  jobApply__body__textarea: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 10,
    padding: 10,
    fontSize: 15,
    height: 120,
    backgroundColor: colors.white,
    fontFamily: "Inter-Normal",
    textAlignVertical: 'top'
  },

  jobApply__body__charCount: {
    fontSize: 12,
    color: colors.gray,
    textAlign: "right",
    marginBottom: 16,
    fontFamily: "Inter-Normal",
  },
});
