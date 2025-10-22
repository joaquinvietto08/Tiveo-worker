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
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  completed__dateText: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.black,
    marginBottom: 8,
    fontFamily: "Inter-Normal",
  },

  // --- Chips ---
  completed__chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 12,
  },

  completed__chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.lightGray,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },

  completed__chipText: {
    fontSize: 13,
    color: colors.black,
    fontFamily: "Inter-Normal",
  },

  // --- Bottom ---
  completed__bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  completed__price: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.black,
    fontFamily: "Inter-Normal",
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
    fontWeight: "500",
    fontFamily: "Inter-Normal",
  },

  // --- Empty state ---
  completed__emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
  },

  completed__emptyText: {
    fontSize: 15,
    color: colors.gray,
    fontStyle: "italic",
    fontFamily: "Inter-Normal",
  },
});
