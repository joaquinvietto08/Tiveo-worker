import { StyleSheet } from "react-native";
import { colors } from "../../../../../styles/globalStyles";

export const styles = StyleSheet.create({
  completed__mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingBottom: 32,
  },

  completed__card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    elevation: 2,
  },

  completed__dateText: {
    fontSize: 16,
    color: colors.black,
    marginBottom: 8,
    fontFamily: "Inter-Medium",
  },

  // --- Chips ---
  completed__chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  completed__chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: colors.white,
  },

  completed__chipText: {
    fontSize: 13,
    color: colors.black,
    fontFamily: "Inter-Medium",
    alignSelf: "stretch",
    textAlign: "center",
  },

  completed__emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
  },

  completed__emptyText: {
    fontSize: 15,
    color: colors.gray,
    fontFamily: "Inter-Italic",
  },

  // --- Bottom ---
  completed__bottomRow: {
    paddingTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  completed__price: {
    fontSize: 20,
    color: colors.black,
    fontFamily: "Inter-Bold",
  },

  completed__detailsButton: {
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },

  completed__detailsButtonText: {
    fontSize: 14,
    color: colors.black,
    fontFamily: "Inter-Normal",
  },

  completed__chargeButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.primary,
    width: "60%",
  },

  completed__chargeButtonText: {
    fontSize: 14,
    color: colors.white,
    fontFamily: "Inter-Medium",
    textAlign: "center",
  },

  // --- Empty state ---
  completed__noCategoryText: {
    fontSize: 14,
    color: colors.gray,
    fontFamily: "Inter-MediumItalic",
    marginBottom: 10,
  },
});
