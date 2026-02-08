import { StyleSheet } from "react-native";
import { colors } from "../../../../styles/globalStyles";

export const styles = StyleSheet.create({
  currentWork__buttons__container: {
    marginTop: 20,
    paddingHorizontal: 16,
    gap: 10,
  },
  // Mensajes
  currentWork__buttons__messageBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    gap: 8,
  },
  currentWork__buttons__messageText: {
    color: colors.white,
    fontFamily: "Inter-Bold",
    fontSize: 15,
  },
  // Acción dinámica
  currentWork__buttons__actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 13,
    gap: 8,
  },
  currentWork__buttons__actionText: {
    color: colors.white,
    fontFamily: "Inter-Bold",
    fontSize: 15,
  },
  // Marcar como solucionado (garantía)
  currentWork__buttons__solveBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF6B35",
    borderRadius: 8,
    paddingVertical: 12,
    gap: 8,
  },
  currentWork__buttons__solveBtnText: {
    color: colors.white,
    fontFamily: "Inter-Bold",
    fontSize: 15,
  },
  // Modal garantía
  currentWork__buttons__modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  currentWork__buttons__modalCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    width: "100%",
    maxWidth: 360,
    elevation: 6,
  },
  currentWork__buttons__modalTitle: {
    fontFamily: "Inter-Bold",
    fontSize: 18,
    color: colors.black,
  },
  currentWork__buttons__modalMessage: {
    fontFamily: "Inter-Regular",
    fontSize: 15,
    color: colors.black,
    lineHeight: 22,
    marginTop: 8,
  },
  currentWork__buttons__modalButtonsRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },
  currentWork__buttons__modalButtonCancel: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.lightGray,
    justifyContent: "center",
  },
  currentWork__buttons__modalButtonCancelText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 15,
    color: colors.black,
    textAlign: "center",
  },
  currentWork__buttons__modalButtonConfirm: {
    flex: 1,
    backgroundColor: "#FF6B35",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  currentWork__buttons__modalButtonConfirmText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 15,
    color: colors.white,
    textAlign: "center",
  },
});
