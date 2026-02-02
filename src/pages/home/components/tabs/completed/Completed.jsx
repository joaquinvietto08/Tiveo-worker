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

const Completed = ({ navigation }) => {
  const { activities, payments } = useContext(UserContext);

  const completeActivities = activities
    .filter((item) => item.status === "cancelled" || item.status === "done")
    .sort((a, b) => {
      // Usar updatedAt si está disponible, sino usar startedAt, sino createdAt
      const dateA = a.updatedAt || a.startedAt || a.createdAt || new Date(0);
      const dateB = b.updatedAt || b.startedAt || b.createdAt || new Date(0);
      return dateB - dateA; // Más nueva primero
    });

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
        const payment = payments?.find((p) => p.activityId === item.id);
        const paymentStatus = String(item.paymentStatus || payment?.status || "").toLowerCase();
        const paymentTotal = Number(payment?.totalAmount ?? payment?.amount ?? 0);
        const activityAmount = Number(item.amount || 0);
        const displayAmount =
          activityAmount > 0
            ? activityAmount
            : paymentTotal > 0
            ? paymentTotal
            : null;
        const isPaid = paymentStatus === "paid" || paymentStatus === "released";
        const hasAmount = displayAmount !== null || isPaid;

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
                  {formatPrice(displayAmount ?? 0)}
                </Text>
              ) : (
                <TouchableOpacity
                  style={styles.completed__chargeButton}
                  activeOpacity={0.85}
                  onPress={() => navigation?.navigate("Payment", { activity: item })}
                >
                  <Text style={styles.completed__chargeButtonText}>
                    Cobrar trabajo
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={styles.completed__detailsButton}
                onPress={() =>
                  navigation?.navigate("ActivityDetail", { activityId: item.id })
                }
                activeOpacity={0.8}
              >
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
