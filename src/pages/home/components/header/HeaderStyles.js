import { StyleSheet } from "react-native";
import { colors } from "../../../../styles/globalStyles";

export const styles = StyleSheet.create({
  home__header__card: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  home__header__rowTop: { flexDirection: "row", gap: 16 },
  home__header__avatarWrap: { width: 72, height: 72 },
  home__header__avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: colors.lightGray,
  },
  home__header__settingsBtn: {
    position: "absolute",
    right: -4,
    bottom: -4,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lightGray,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  home__header__infoCol: { 
    flex: 1, 
    justifyContent: "center",
    gap: 4
  },
  home__header__fullName: { 
    fontSize: 18, 
    fontFamily: "Inter-SemiBold",
    color: colors.black, 
  },
  home__header__workerName: { 
    fontSize: 14, 
    fontFamily: "Inter-Normal",
    color: colors.black,
    opacity: 0.7
  },
});
