import { StyleSheet } from "react-native";
import { colors } from "../../../../styles/globalStyles";

export const styles = StyleSheet.create({
  messages__header__container: {
    backgroundColor: colors.white,
    height: 80,
    alignItems: "center",
    paddingHorizontal: 10,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray
  },
  messages__header__button: {
    padding: 10,
  },
  messages__header__clientContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingLeft: 10,
  },
  messages__header__clientImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    resizeMode: "cover",
  },
  messages__header__nameText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 18,
    color: colors.black,
    width: "70%",
  },
});
