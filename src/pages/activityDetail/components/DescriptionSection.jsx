import React from "react";
import { View, Text } from "react-native";
import { styles } from "../ActivityDetailStyles";

const DescriptionSection = ({ description }) => {
  const hasDescription = description && description.trim().length > 0;
  return (
    <View style={styles.activityDetail__sectionCard}>
      <Text style={styles.activityDetail__sectionTitle}>Descripción</Text>
      <Text style={styles.activityDetail__descriptionText}>
        {hasDescription
          ? description.trim()
          : "Este trabajo no tiene una descripción registrada."}
      </Text>
    </View>
  );
};

export default DescriptionSection;
