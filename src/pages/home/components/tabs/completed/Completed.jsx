import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./CompletedStyles";
import { UserContext } from "../../../../../context/UserContext";
import {
  formatDate,
  formatPrice,
  formatTime,
  translateService,
} from "../../../../../utils/formatHelpers";
import { getIcon } from "../../../../../utils/getIcons";

const Completed = () => {
  const { activities } = useContext(UserContext);

  const completeActivities = activities.filter(
    (item) => item.status === "cancelled" || item.status === "done"
  );

  if (!completeActivities.length) {
    return (
      <View style={styles.completed__emptyContainer}>
        <Text style={styles.completed__emptyText}>
          Aún no tienes trabajos completados
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.completed__mainContainer}>
      {completeActivities.map((item) => {
        const services = item.services || [];
        const hasServices = services.length > 0;
        const hasAmount = item.amount && item.amount > 0;

        return (
          <View key={item.id} style={styles.completed__card}>
            <Text style={styles.completed__dateText}>
              {formatDate(item.startedAt)} {formatTime(item.startedAt)} hs
            </Text>

            {/* --- Servicios o texto "Sin categoría" --- */}
            {hasServices ? (
              <View style={styles.completed__chipsRow}>
                {services.map((srv, index) => {
                  const ServiceIcon = getIcon(srv);
                  return (
                    <View key={index} style={styles.completed__chip}>
                      <ServiceIcon width={16} height={16} />
                      <Text style={styles.completed__chipText}>
                        {translateService(srv)}
                      </Text>
                    </View>
                  );
                })}
              </View>
            ) : (
              <Text style={styles.completed__noCategoryText}>
                Sin categoría
              </Text>
            )}

            {/* --- Monto o Cobrar + botón de detalles --- */}
            <View style={styles.completed__bottomRow}>
              {hasAmount ? (
                <Text style={styles.completed__price}>
                  {formatPrice(item.amount)}
                </Text>
              ) : (
                <TouchableOpacity style={styles.completed__chargeButton}>
                  <Text style={styles.completed__chargeButtonText}>
                    Cobrar trabajo
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity style={styles.completed__detailsButton}>
                <Text style={styles.completed__detailsButtonText}>
                  Ver detalles
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default Completed;
