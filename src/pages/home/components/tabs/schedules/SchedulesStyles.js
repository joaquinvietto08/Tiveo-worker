import { StyleSheet } from "react-native";
import { colors } from "../../../../../styles/globalStyles";

export const styles = StyleSheet.create({
  schedules__scroll: {
    flex: 1,
    backgroundColor: colors.background,
  },
  schedules__container: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  schedules__card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  schedules__title: {
    fontSize: 16,
    color: colors.black,
    marginBottom: 8,
    fontFamily: "Inter-Bold",
  },
  schedules__title__italic: {
    color: colors.gray,
    fontFamily: "Inter-Italic",
  },
  schedules__client: {
    color: colors.black,
    fontSize: 14,
    marginBottom: 12,
    fontFamily: "Inter-Medium",
  },
  schedules__sectionLabel: {
    fontSize: 13,
    color: colors.gray,
    marginBottom: 4,
    fontFamily: "Inter-Regular",
  },
  schedules__iconText: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 12,
  },
  schedules__text: {
    color: colors.black,
    fontSize: 14,
    fontFamily: "Inter-Regular",
  },
  // --- Momento / Fecha ---
  schedules__momentRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 12,
  },
  schedules__momentNow: {
    color: "#FFA500",
    fontFamily: "Inter-SemiBold",
  },
  schedules__momentScheduled: {
    color: colors.black,
    fontFamily: "Inter-SemiBold",
  },
  // --- Chips ---
  schedules__servicesContainer: {
    marginBottom: 12,
  },
  schedules__chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  schedules__chip: {
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
  schedules__chipText: {
    fontSize: 13,
    color: colors.black,
    fontFamily: "Inter-Medium",
  },
  // --- Botones ---
  schedules__buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  schedules__buttonDetails: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    marginRight: 8,
  },
  schedules__buttonDetailsText: {
    color: colors.black,
    fontFamily: "Inter-Medium",
  },
  schedules__buttonMessage: {
    flex: 1,
    backgroundColor: "#FFA500",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  schedules__buttonMessageText: {
    color: colors.white,
    fontFamily: "Inter-SemiBold",
  },
  schedules__emptyText: {
    textAlign: "center",
    color: colors.gray,
    fontFamily: "Inter-Regular",
    marginTop: 20,
  },
  schedules__modalOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.8)",
    alignItems: "center",
    justifyContent: "center",
  },
  schedules__modalImage: {
    width: "90%",
    height: "70%",
    resizeMode: "contain",
    borderRadius: 10,
  },
});
