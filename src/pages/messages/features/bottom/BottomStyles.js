import { StyleSheet } from "react-native";
import { colors } from "../../../../styles/globalStyles";

export const styles = StyleSheet.create({
  messages__bottom__container: {
    backgroundColor: colors.backgroundColor,
    paddingVertical: 20,
    alignItems: "flex-end",
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
  },
  messages__bottom__subcontainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    gap: 3,
    flex: 1,
  },
  messages__bottom__imageButton: {
    padding: 13,
    justifyContent: "center",
    alignItems: "center",
  },
  messages__bottom__input: {
    flex: 1,
    paddingHorizontal: 0,
    paddingRight: 10,
  },
  messages__bottom__sendButton: {
    backgroundColor: colors.primary,
    borderRadius: 50,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
