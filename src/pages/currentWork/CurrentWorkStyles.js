import { StyleSheet } from "react-native";
import { colors } from "../../styles/globalStyles";

export const styles = StyleSheet.create({
  currentWork__container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  currentWork__scrollView: {
    flex: 1,
  },
  currentWork__scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 48,
  },
  currentWork__warrantyBanner: {
    backgroundColor: colors.white,
    marginHorizontal: 16,
    marginTop: 14,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 18,
    elevation: 2,
  },
  currentWork__warrantyBannerText: {
    fontFamily: "Inter-Medium",
    fontSize: 15,
    color: colors.gray,
    textAlign: "center",
  },
  currentWork__cancelBtn: {
    alignSelf: "center",
    marginTop: 40,
    marginBottom: 60,
  },

  currentWork__cancelText: {
    color: "red",
    fontFamily: "Inter-Bold",
    fontSize: 15,
  },

  // --- Modal ---
  currentWork__modal__overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  currentWork__modal__content: {
    backgroundColor: colors.white,
    borderRadius: 14,
    paddingVertical: 24,
    paddingHorizontal: 24,
    width: "100%",
    maxWidth: 340,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },

  currentWork__modal__title: {
    fontFamily: "Inter-Medium",
    fontSize: 16,
    color: colors.black,
    textAlign: "center",
    marginBottom: 22,
    lineHeight: 22,
  },

  currentWork__modal__actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 24,
  },

  currentWork__modal__cancelBtn: {
    backgroundColor: colors.black,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 18,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  currentWork__modal__cancelBtnText: {
    color: colors.white,
    fontFamily: "Inter-Regular",
    fontSize: 14,
  },

  currentWork__modal__confirmText: {
    color: "red",
    fontFamily: "Inter-Regular",
    fontSize: 15,
  },
});
