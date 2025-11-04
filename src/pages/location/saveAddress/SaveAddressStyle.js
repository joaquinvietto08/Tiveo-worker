import { StyleSheet } from "react-native";
import { colors } from "../../../styles/globalStyles";

export const styles = StyleSheet.create({
  saveAddress__mainContainer: {
    backgroundColor: colors.background,
    flex: 1,
  },
  saveAddress__headerContainer: {
    width: "100%",
    height: 90,
  },
  saveAddress__backButton: {
    width: 70,
    height: 50,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  saveAddress__container: {
    alignItems: "center",
    paddingBottom: 30,
  },
  saveAddress__title: {
    fontFamily: "Inter-Bold",
    fontSize: 20,
  },
  saveAddress__formContainer: {
    paddingHorizontal: 20,
  },
  saveAddress__bottomContainer: {
    height: 100,
    marginTop: 25,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  saveAddress__textLater: {
    fontFamily: "Inter-SemiBold",
    textDecorationLine: "underline",
  },
});
