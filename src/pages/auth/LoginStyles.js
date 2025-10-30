import { StyleSheet } from "react-native";
import { colors } from "../../styles/globalStyles";

export const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.background,
    flex: 1,
  },
  container: {
    marginTop: 70,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "Inter-Bold",
    width: "100%",
    borderBottomWidth: 0.2,
    height: 50,
    textAlign: "center",
    borderColor: "#98A2B3",
  },
  social_authContainer: {
    marginTop: 30,
    width: "100%",
    gap: 15,
    justifyContent: "space-between",
    marginBottom: 40,
  },
  social_authButton: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    width: "100%",
    height: 46,
    borderRadius: 8,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  socialButtonText: {
    marginLeft: 10,
    fontSize: 15,
    color: "#000",
    fontFamily: "Inter-Regular",
  },
  phone_authContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 25,
    paddingTop: 20,
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#E0E0E0",
  },
});
