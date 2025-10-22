import { StyleSheet } from "react-native";
import { colors } from "../../../../styles/globalStyles";

export const styles = StyleSheet.create({
  jobApply__summary__card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  jobApply__summary__description: {
    fontSize: 16,
    color: colors.black,
    marginBottom: 6,
    fontFamily: "Inter-Normal",
  },

  jobApply__summary__description__italic: {
    color: colors.gray,
    fontFamily: "Inter-Italic",
  },

  jobApply__summary__client: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 6,
    fontFamily: "Inter-Normal",
  },

  jobApply__summary__iconText: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },

  jobApply__summary__address: {
    fontSize: 14,
    color: colors.black,
    marginLeft: 4,
    fontFamily: "Inter-Normal",
  },

  jobApply__summary__momentRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },

  jobApply__summary__momentNow: {
    color: "#FFA500",
    marginLeft: 6,
    fontFamily: "Inter-SemiBold",
  },

  jobApply__summary__momentScheduled: {
    color: colors.black,
    marginLeft: 6,
    fontFamily: "Inter-Medium",
  },

  jobApply__summary__chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8,
  },

  jobApply__summary__chip: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: colors.white,
  },

  jobApply__summary__chipText: {
    fontSize: 13,
    color: colors.black,
    marginLeft: 6,
    fontFamily: "Inter-Normal",
  },
});
