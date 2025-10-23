import { StyleSheet } from "react-native";
import { colors } from "../../../../styles/globalStyles";

export const styles = StyleSheet.create({
  home__state__container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: colors.lightGray,
  },

  home__state__optionsContainer: {
    flexDirection: "row",
    gap: 8,
  },

  // --- CHIPS ---
  home__state__chip: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.lightGray,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },

  // Variantes de color por estado
  home__state__chip__active: {
    backgroundColor: "#EAF8F3",
    borderColor: "#CFEFE5",
  },
  home__state__chip__busy: {
    backgroundColor: "#FFF4E1",
    borderColor: "#F2D199",
  },
  home__state__chip__inactive: {
    backgroundColor: "#FFEAEA",
    borderColor: "#E6B3B3",
  },

  // --- DOTS ---
  home__state__dot: { width: 8, height: 8, borderRadius: 4 },
  home__state__dot__active: { backgroundColor: "#00B383" },
  home__state__dot__busy: { backgroundColor: "#E6A600" },
  home__state__dot__inactive: { backgroundColor: "#BC0000" },

  // --- TEXTOS ---
  home__state__chipText: {
    fontSize: 14,
    marginLeft: 6,
    fontFamily: "Inter-Normal",
  },
  home__state__chipText__active: { color: "#00B383", fontFamily: "Inter-Medium" },
  home__state__chipText__busy: { color: "#E6A600", fontFamily: "Inter-Medium" },
  home__state__chipText__inactive: { color: "#BC0000", fontFamily: "Inter-Medium" },

  // --- CHIP DE UBICACIÓN ---
  home__state__locationChip: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.lightGray,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: colors.white,
  },
  home__state__locationText: {
    color: colors.gray,
    fontSize: 14,
    marginLeft: 6,
  },
});
