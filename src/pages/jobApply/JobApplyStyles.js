import { StyleSheet } from "react-native";
import { colors } from "../../styles/globalStyles";

export const styles = StyleSheet.create({
  jobApply__container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  jobApply__scrollContente: {
    flex: 1,
  },
  jobApply__container: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  jobApply__title: {
    paddingTop: 20,
    fontSize: 20,
    color: colors.black,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Inter-Bold",
  },

  jobApply__buttonsRow: {
    justifyContent: "space-between",
    marginTop: 10,
    gap: 20,
    alignItems: "center",
    paddingBottom: 40
  },

  jobApply__buttonCancel: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginRight: 8,
    width: "50%",
    backgroundColor: colors.white,
  },

  jobApply__buttonCancelText: {
    fontSize: 15,
    color: colors.black,
    fontFamily: "Inter-Normal",
  },

  jobApply__buttonSubmit: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: colors.black,
    width: "100%"
  },

  jobApply__buttonSubmitText: {
    fontSize: 15,
    color: colors.white,
    fontFamily: "Inter-SemiBold",
  },
});
