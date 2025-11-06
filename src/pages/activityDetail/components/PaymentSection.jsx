import React, { useMemo } from "react";
import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "../ActivityDetailStyles";
import { formatPrice } from "../../../utils/formatHelpers";
import { colors } from "../../../styles/globalStyles";

const statusLabelMap = {
  pending: "Pendiente de cobro",
  paid: "Pagado",
  released: "Pagado",
  cancelled: "Cancelado",
};

const statusBackgroundMap = {
  pending: "#FFF1CC",
  paid: "#D7F5DD",
  released: "#D7F5DD",
  cancelled: "#FCD7D7",
};

const PaymentSection = ({ activity }) => {
  const amountLabel = useMemo(() => {
    if (typeof activity?.amount === "number") {
      return formatPrice(activity.amount);
    }
    if (activity?.amount) {
      const parsed = Number(activity.amount);
      return Number.isNaN(parsed) ? activity.amount : formatPrice(parsed);
    }
    return "No registrado";
  }, [activity]);

  const paymentStatus = activity?.paymentStatus;
  const normalizedStatus = paymentStatus?.toLowerCase?.() || "";
  const hasPayment =
    normalizedStatus && normalizedStatus !== "pending";
  const paymentMethod =
    activity?.paymentMethod ||
    activity?.payment?.method ||
    activity?.payment?.methodLabel ||
    activity?.payment?.type ||
    null;

  const statusLabel = paymentStatus
    ? statusLabelMap[paymentStatus] || paymentStatus
    : "Estado no disponible";

  const badgeBackground =
    (paymentStatus && statusBackgroundMap[paymentStatus]) || colors.background;

  const badgeColor =
    paymentStatus === "pending"
      ? colors.black
      : paymentStatus === "cancelled"
      ? "#C62828"
      : colors.black;

  if (!hasPayment) {
    return (
      <View style={styles.activityDetail__sectionCard}>
        <Text style={styles.activityDetail__sectionTitle}>Pago</Text>
        <View style={styles.activityDetail__paymentEmptyBox}>
          <MaterialIcons name="receipt-long" size={22} color={colors.black} />
          <Text style={styles.activityDetail__paymentEmptyText}>
            Aún no hay pago
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.activityDetail__sectionCard}>
      <Text style={styles.activityDetail__sectionTitle}>Pago</Text>

      <View style={styles.activityDetail__paymentRow}>
        <Text style={styles.activityDetail__paymentLabel}>Total</Text>
        <Text style={styles.activityDetail__paymentValue}>{amountLabel}</Text>
      </View>

      <Text
        style={[
          styles.activityDetail__badge,
          { backgroundColor: badgeBackground, color: badgeColor },
        ]}
      >
        {statusLabel}
      </Text>

      {paymentMethod && (
        <Text style={styles.activityDetail__paymentMethodTag}>
          {paymentMethod}
        </Text>
      )}
    </View>
  );
};

export default PaymentSection;
