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
});
