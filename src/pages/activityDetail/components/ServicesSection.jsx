import React from "react";
import { View, Text } from "react-native";
import { styles } from "../ActivityDetailStyles";
import { translateService } from "../../../utils/formatHelpers";
import { getIcon } from "../../../utils/getIcons";

const ServicesSection = ({ services = [] }) => {
  if (!services?.length) {
    return (
      <View style={styles.activityDetail__sectionCard}>
        <Text style={styles.activityDetail__sectionTitle}>Categorías</Text>
        <Text style={styles.activityDetail__emptyText}>
          Sin categorías registradas
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.activityDetail__sectionCard}>
      <Text style={styles.activityDetail__sectionTitle}>Categorías</Text>
      <View style={styles.activityDetail__chipsRow}>
        {services.map((service, index) => {
          const Icon = getIcon(service);
          return (
            <View key={`${service}-${index}`} style={styles.activityDetail__chip}>
              {Icon ? <Icon width={16} height={16} /> : null}
              <Text style={styles.activityDetail__chipText}>
                {translateService(service)}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default ServicesSection;
