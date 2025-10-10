import { StyleSheet } from "react-native";
import { colors } from "../../../../../styles/globalStyles";

export const styles = StyleSheet.create({
  state__modal__overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  state__modal__card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    width: "100%",
    padding: 20,
  },
  state__modal__header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  state__modal__title: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.black,
  },
  state__modal__option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  state__modal__option__selected: {
    borderWidth: 1,
    borderColor: colors.black,
    backgroundColor: colors.white,
  },
  state__modal__optionLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  state__modal__dot: { width: 12, height: 12, borderRadius: 6 },
  state__modal__optionLabel: { fontSize: 15, fontWeight: "600", color: colors.black },
  state__modal__optionDesc: { fontSize: 13, color: colors.gray },
});
