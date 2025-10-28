import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  inputs__phoneInput__container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  inputs__phoneInput__selectCountry: {
    width: "30%",
    height: 48,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#C8C8C8",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  inputs__phoneInput__flag: {
    fontSize: 20,
  },
  inputs__phoneInput__InputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "68%",
    height: 48,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#C8C8C8",
    paddingHorizontal: 15,
  },
  inputs__phoneInput__countryCode: {
    fontFamily: "Inter-Regular",
  },
  inputs__phoneInput__textInput: {
    fontFamily: "Inter-Regular",
    height: "100%",
    paddingRight: 15,
    paddingLeft: 8,
    justifyContent: "center",
    flex: 1,
  },
  inputs__phoneInput__contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 25,
    paddingTop: 20,
  },
  inputs__phoneInput__countryItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    width: "100%",
  },
  inputs__phoneInput__flag: {
    fontSize: 20,
  },
  inputs__phoneInput__countryName: {
    fontSize: 15,
    fontFamily: "Inter-Regular",
  },
  inputs__phoneInput__countryCode: {
    fontSize: 16,
    color: "#888",
    fontFamily: "Inter-Regular",
  },
  inputs__phoneInput__separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#E0E0E0",
  },
});
