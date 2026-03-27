import { StyleSheet } from "react-native";
import { colors } from "../../styles/globalStyles";

export const styles = StyleSheet.create({
  onboarding__mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  onboarding__cancelBtn: {
    borderRadius: 12,
    borderColor: "red",
    borderWidth: 2,
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 6,
    alignSelf: "flex-start",
    marginBottom: 10
  },
  onboarding__cancelBtnText: {
    fontSize: 16,
    fontFamily: "Inter-Medium",
    color: "red",
  },
});
