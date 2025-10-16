import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "./CompletedStyles";

const Completed = ({ completed = [] }) => {
  if (!completed.length) {
    return (
      <View style={styles.completed__emptyContainer}>
        <Text style={styles.completed__emptyText}>Aún no tienes trabajos completados</Text>
      </View>
    );
  }

  return (
    <View style={styles.completed__container}>
      {completed.map((item) => {
        const services = item.services || [];
        const hasServices = services.length > 0;

        return (
          <View key={item.id} style={styles.completed__card}>
            {/* Fecha y hora */}
            <Text style={styles.completed__dateText}>
              {item.scheduledDateTime
                ? new Date(item.scheduledDateTime).toLocaleString("es-AR", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    hour: "2-digit",
                    minute: "2-digit",
                  }) + " hs"
                : "Fecha no disponible"}
            </Text>

            {/* Chips de servicios */}
            {hasServices && (
              <View style={styles.completed__chipsRow}>
                {services.map((srv, index) => (
                  <View key={index} style={styles.completed__chip}>
                    <MaterialCommunityIcons name="leaf" size={16} color="#000" />
                    <Text style={styles.completed__chipText}>
                      {srv.charAt(0).toUpperCase() + srv.slice(1)}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {/* Monto y botón */}
            <View style={styles.completed__bottomRow}>
              <Text style={styles.completed__price}>
                ${item.amount ? item.amount.toLocaleString("es-AR") : "0"}
              </Text>

              <TouchableOpacity style={styles.completed__detailsButton}>
                <Text style={styles.completed__detailsButtonText}>Ver detalles</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default Completed;
