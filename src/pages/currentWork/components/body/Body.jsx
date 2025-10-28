import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./BodyStyles";
import {
  formatDate,
  formatTime,
  translateService,
} from "../../../../utils/formatHelpers";
import { getIcon } from "../../../../utils/getIcons";

const Body = ({ activity }) => {
  const {
    description,
    user,
    address,
    scheduledDateTime,
    services = [],
  } = activity;

  // 🕒 Formatear fecha y hora si existen
  const formattedDateTime = scheduledDateTime
    ? `${formatDate(scheduledDateTime)} • ${formatTime(scheduledDateTime)} hs`
    : "Sin fecha programada";

  return (
    <View style={styles.currentWork__body__container}>
      <Text style={styles.currentWork__body__title}>
        {description || "Trabajo sin descripción"}
      </Text>

      {/* Información del cliente */}
      <View style={styles.currentWork__body__clientRow}>
        <View>
          <Text style={styles.currentWork__body__clientName}>
            {user?.displayName || "Cliente desconocido"}
          </Text>
          <Text style={styles.currentWork__body__clientLabel}>Cliente</Text>
        </View>

        <TouchableOpacity
          style={styles.currentWork__body__callButton}
          activeOpacity={0.8}
          onPress={() => {}}
        >
          <MaterialIcons name="call" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Dirección */}
      {address?.address && (
        <View style={styles.currentWork__body__section}>
          <Text style={styles.currentWork__body__sectionTitle}>Dirección</Text>
          <View style={styles.currentWork__body__sectionBox}>
            <MaterialIcons name="location-on" size={18} color="#555" />
            <Text style={styles.currentWork__body__sectionText}>
              {address.address}
            </Text>
          </View>
        </View>
      )}

      {/* Fecha y hora */}
      {scheduledDateTime && (
        <View style={styles.currentWork__body__section}>
          <Text style={styles.currentWork__body__sectionTitle}>
            Fecha y hora programada
          </Text>
          <View style={styles.currentWork__body__sectionBox}>
            <MaterialIcons name="event" size={18} color="#555" />
            <Text style={styles.currentWork__body__sectionText}>
              {formattedDateTime.charAt(0).toUpperCase() +
                formattedDateTime.slice(1)}
            </Text>
          </View>
        </View>
      )}

      {/* Servicios */}
      {services.length > 0 && (
        <View style={styles.currentWork__body__section}>
          <Text style={styles.currentWork__body__sectionTitle}>Servicios</Text>
          <View style={styles.currentWork__body__servicesRow}>
            {services.map((srv, index) => {
              const ServiceIcon = getIcon(srv);
              return (
                <View key={index} style={styles.currentWork__body__serviceTag}>
                  <ServiceIcon width={16} height={16} />
                  <Text style={styles.currentWork__body__serviceText}>
                    {translateService(srv)}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      )}
    </View>
  );
};

export default Body;
