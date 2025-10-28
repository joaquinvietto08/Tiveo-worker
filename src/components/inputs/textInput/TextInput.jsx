import { TextInput } from "react-native";
import { styles } from "./TextInputStyles";
import { colors } from "../../../styles/globalStyles";

const TextInputComponent = ({
  style,
  placeholder,
  placeholderTextColor = "#8A8A8A",
  selectionColor = colors.primary,
  cursorColor = "black",
  maxLength,
  value,
  onChangeText,
  borderless = false,
  ...props
}) => {
  return (
    <TextInput
      style={[
        styles.inputs__textInput__container,
        borderless && { borderWidth: 0 },
        style,
      ]}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      selectionColor={selectionColor}
      cursorColor={cursorColor}
      maxLength={maxLength}
      value={value}
      onChangeText={onChangeText}
      {...props}
    />
  );
};

export default TextInputComponent;
