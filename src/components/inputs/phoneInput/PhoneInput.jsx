import React from "react";
import { TextInput, View } from "react-native";
import { styles } from "./PhoneInputStyles";
import { colors } from "../../../styles/globalStyles";

const PhoneInputComponent = ({
  style,
  placeholder = "Ej: 123456789",
  placeholderTextColor = "#8A8A8A",
  selectionColor = colors.primary,
  cursorColor = "black",
  maxLength = 15,
  value,
  onChangeText,
  ...props
}) => {
  return (
    <View style={[styles.inputs__phoneInput__container, style]}>
      <TextInput
        style={styles.inputs__phoneInput__textInput}
        keyboardType="numeric"
        maxLength={maxLength}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        selectionColor={selectionColor}
        cursorColor={cursorColor}
        onChangeText={(text) => {
          const numericText = text.replace(/[^0-9]/g, "");
          onChangeText(numericText);
        }}
        {...props}
      />
    </View>
  );
};

export default PhoneInputComponent;
