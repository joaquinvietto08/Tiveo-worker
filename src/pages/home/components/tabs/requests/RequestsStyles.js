import { StyleSheet } from "react-native";
import { colors } from "../../../../../styles/globalStyles";

export const styles = StyleSheet.create({
  requests__scroll: {
    flex: 1,
    backgroundColor: colors.background,
  },
  requests__container: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  requests__card: {
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
  requests__title: {
    fontSize: 16,
    color: colors.black,
    marginBottom: 8,
    fontFamily: "Inter-Bold",
  },
  requests__title__italic: {
    fontStyle: "italic",
    color: colors.gray,
    fontSize: 16,
    fontFamily: "Inter-Regular",
  },
  requests__client: {
    color: colors.black,
    fontSize: 14,
    marginBottom: 12,
    fontFamily: "Inter-Medium",
  },
  requests__sectionLabel: {
    fontSize: 13,
    color: colors.gray,
    marginBottom: 4,
    fontFamily: "Inter-Regular",
  },
  requests__iconText: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 12,
  },
  requests__text: {
    color: colors.black,
    fontSize: 14,
    fontFamily: "Inter-Regular",
  },
  // --- Fecha / Momento ---
  requests__momentRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 12,
  },
  requests__momentNow: {
    color: "#FFA500",
    fontFamily: "Inter-SemiBold",
    alignSelf: "stretch",
    textAlign: "center",
  },
  requests__momentScheduled: {
    color: colors.black,
    fontFamily: "Inter-SemiBold",
  },
  // --- Categorías ---
  requests__servicesContainer: {
    marginBottom: 12,
  },
  requests__chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  requests__chip: {
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
  requests__chipText: {
    fontSize: 13,
    color: colors.black,
    fontFamily: "Inter-Medium",
    alignSelf: "stretch",
    textAlign: "center",
  },
  // --- Imágenes ---
  requests__imagesContainer: {
    marginVertical: 8,
  },
  requests__imageThumb: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 8,
  },
  // --- Botones ---
  requests__buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  requests__buttonReject: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    marginRight: 8,
  },
  requests__buttonRejectText: {
    color: colors.black,
    fontFamily: "Inter-Medium",
    alignSelf: "stretch",
    textAlign: "center",
  },
  requests__buttonAccept: {
    flex: 1,
    backgroundColor: colors.black,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  requests__buttonAcceptText: {
    color: colors.white,
    fontFamily: "Inter-SemiBold",
    alignSelf: "stretch",
    textAlign: "center",
  },
  requests__buttonAccept__disabled: {
    backgroundColor: colors.lightGray,
  },
  requests__buttonAcceptText__disabled: {
    color: colors.gray,
  },
  // --- Modal ---
  requests__modalOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.8)",
    alignItems: "center",
    justifyContent: "center",
  },
  requests__modalImage: {
    width: "90%",
    height: "70%",
    resizeMode: "contain",
    borderRadius: 10,
  },
});
