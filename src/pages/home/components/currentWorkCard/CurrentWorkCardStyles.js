import { StyleSheet } from "react-native";
import { colors } from "../../../../styles/globalStyles";

export const styles = StyleSheet.create({
  home__currentWork__container: {
    backgroundColor: colors.black,
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginHorizontal: 16,
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  home__currentWork__left: {
    position: "absolute",
    top: 12,
    left: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  home__currentWork__statusDot: {
    width: 8,
    height: 8,
    borderRadius: 50,
    backgroundColor: colors.white,
    marginRight: 6,
  },
  home__currentWork__statusText: {
    color: colors.white,
    fontFamily: "Inter-Bold",
    fontSize: 13,
    alignSelf: "stretch",
    textAlign: "center",
  },
  home__currentWork__info: {
    flex: 1,
    marginLeft: 4,
    paddingTop: 15,
  },
  home__currentWork__title: {
    color: colors.white,
    fontFamily: "Inter-Bold",
    fontSize: 17,
    marginBottom: 4,
    alignSelf: "stretch",
    textAlign: "left",
  },
  home__currentWork__client: {
    color: colors.white,
    fontFamily: "Inter-Normal",
    fontSize: 14,
  },
  home__currentWork__locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  home__currentWork__locationText: {
    color: colors.white,
    fontFamily: "Inter-Normal",
    fontSize: 13,
    marginLeft: 4,
  },
  home__currentWork__arrow: {
    marginLeft: 10,
  },
  // --- Estilos para garantía ---
  home__currentWork__container__warranty: {
    backgroundColor: "#FF6B35", // Color naranja para garantía
  },
  home__currentWork__statusDot__warranty: {
    backgroundColor: "#FFE5DC",
  },
  home__currentWork__solveButton: {
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
  },
  home__currentWork__solveButtonText: {
    color: "#FF6B35",
    fontFamily: "Inter-Bold",
    fontSize: 14,
  },
  // --- Estilos para modal de confirmación ---
  home__currentWork__modalOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  home__currentWork__modalCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    width: "100%",
    maxWidth: 360,
    elevation: 6,
    gap: 12,
  },
  home__currentWork__modalTitle: {
    fontFamily: "Inter-Bold",
    fontSize: 18,
    color: colors.black,
  },
  home__currentWork__modalMessage: {
    fontFamily: "Inter-Regular",
    fontSize: 15,
    color: colors.black,
    lineHeight: 22,
  },
  home__currentWork__modalButtonsRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  home__currentWork__modalButtonCancel: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.lightGray,
    justifyContent: "center",
  },
  home__currentWork__modalButtonCancelText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 15,
    color: colors.black,
  },
  home__currentWork__modalButtonConfirm: {
    flex: 1,
    backgroundColor: "#FF6B35",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  home__currentWork__modalButtonConfirmText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 15,
    textAlign: "center",
    color: colors.white,
  },
});
