import React from "react";
import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "../ActivityDetailStyles";
import { colors } from "../../../styles/globalStyles";

const AddressSection = ({ address }) => {
  const hasAddressInfo =
    address?.address || address?.floor || address?.instructions || address?.phone;

  if (!hasAddressInfo) {
    return (
      <View style={styles.activityDetail__sectionCard}>
        <Text style={styles.activityDetail__sectionTitle}>Ubicación</Text>
        <Text style={styles.activityDetail__emptyText}>
          Sin información de dirección
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.activityDetail__sectionCard}>
      <Text style={styles.activityDetail__sectionTitle}>Ubicación</Text>

      {address?.address ? (
        <View style={styles.activityDetail__row}>
          <MaterialIcons
            name="location-on"
            size={20}
            color={colors.primary}
            style={{ marginTop: 2 }}
          />
          <View style={styles.activityDetail__rowTextContainer}>
            <Text style={styles.activityDetail__rowText}>{address.address}</Text>
            {address?.floor ? (
              <Text style={styles.activityDetail__rowSubText}>
                Piso / Unidad: {address.floor}
              </Text>
            ) : null}
          </View>
        </View>
      ) : null}

      {address?.instructions ? (
        <View style={styles.activityDetail__row}>
          <MaterialIcons
            name="info-outline"
            size={20}
            color={colors.primary}
            style={{ marginTop: 2 }}
          />
          <View style={styles.activityDetail__rowTextContainer}>
            <Text style={styles.activityDetail__rowText}>
              {address.instructions}
            </Text>
            <Text style={styles.activityDetail__rowSubText}>
              Instrucciones
            </Text>
          </View>
        </View>
      ) : null}

      {address?.phone ? (
        <View style={styles.activityDetail__row}>
          <MaterialIcons
            name="call"
            size={20}
            color={colors.primary}
            style={{ marginTop: 2 }}
          />
          <View style={styles.activityDetail__rowTextContainer}>
            <Text style={styles.activityDetail__rowText}>{address.phone}</Text>
            <Text style={styles.activityDetail__rowSubText}>
              Teléfono de contacto
            </Text>
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default AddressSection;
