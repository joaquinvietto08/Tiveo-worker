import { StyleSheet } from "react-native";
import { colors } from "../../../../../styles/globalStyles";

export const styles = StyleSheet.create({
  saveAddress__form__floorInput: {
    width: "60%",
    marginBottom: 15,
  },
  saveAddress__form__notesInput: {
    minHeight: 70,
    marginBottom: 15,
    textAlignVertical: "top",
    paddingVertical: 15,
  },
  saveAddress__form__phoneInput: {
    marginBottom: 15,
  },
  saveAddress__form__nameInput: {},
  saveAddress__form__saveButton: {
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.black,
    width: "100%",
    borderRadius: 8,
    marginTop: 35,
  },
  saveAddress__form__textButton: {
    color: "#fff",
    fontFamily: "Inter-SemiBold",
  },
});
