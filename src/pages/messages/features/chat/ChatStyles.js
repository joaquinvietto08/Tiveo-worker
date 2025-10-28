import { StyleSheet } from "react-native";
import { colors } from "../../../../styles/globalStyles";

export const styles = StyleSheet.create({
  messages__chat__list: {
    paddingHorizontal: 12,
    paddingTop: 20,
    paddingBottom: 20,
    gap: 10,
  },

  messages__chat__item: {
    maxWidth: "75%",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 14,
  },

  messages__chat__item__other: {
    alignSelf: "flex-start",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },

  messages__chat__item__me: {
    alignSelf: "flex-end",
    backgroundColor: colors.primary,
  },

  messages__chat__text: {
    color: colors.black,
    fontFamily: "Inter-Regular",
  },

  messages__chat__text__me: {
    color: colors.white,
  },

  messages__chat__time: {
    marginTop: 4,
    fontSize: 12,
    fontFamily: "Inter-Regular",
    textAlign: "right",
    color: colors.black,
  },

  messages__chat__time__me: {
    color: colors.white,
  },

  messages__chat__image: {
    width: 220,
    height: 220,
    borderRadius: 12,
    overflow: "hidden",
  },

  messages__chat__imageContainer: {
    maxWidth: "75%",
    height: 228,
    paddingVertical: 4,
    paddingHorizontal: 4,
    borderRadius: 14,
  },

  messages__chat__image__other: {
    alignSelf: "flex-start",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },

  messages__chat__image__me: {
    alignSelf: "flex-end",
    backgroundColor: colors.primary,
  },

  messages__chat__timeImage: {
    marginTop: -30,
    fontSize: 12,
    paddingRight: 12,
    fontFamily: "Inter-Regular",
    textAlign: "right",
    color: colors.white,
  },
  messages__chat__fullscreenOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  messages__chat__fullscreenImage: {
    width: "100%",
    height: "90%",
  },

  messages__chat__fullscreenHint: {
    color: "white",
    fontSize: 14,
    opacity: 0.8,
    marginTop: 12,
    textAlign: "center",
  },
});
