import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "../ActivityDetailStyles";
import { colors } from "../../../styles/globalStyles";

const HelpButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={styles.activityDetail__helpButton}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <MaterialIcons name="headset-mic" size={20} color={colors.black} />
      <Text style={styles.activityDetail__helpText}>Ayuda</Text>
    </TouchableOpacity>
  );
};

export default HelpButton;
