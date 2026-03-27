import React, { useMemo } from "react";
import { View, Text } from "react-native";
import { styles } from "../ActivityDetailStyles";
import {
  formatDate,
  formatTime,
  formatPrice,
} from "../../../utils/formatHelpers";

const getDateTimeLabel = (activity) => {
  const candidate =
    activity?.startedAt ||
    activity?.scheduledDateTime ||
    activity?.createdAt ||
    null;

  if (!candidate) return "Sin fecha registrada";

  try {
    const labelDate = formatDate(candidate);
    const labelTime = formatTime(candidate);
    return `${labelDate} • ${labelTime} hs`;
  } catch (error) {
    return "Fecha no disponible";
  }
};

const SummaryCard = ({ activity }) => {
  const client = useMemo(() => {
    if (!activity) return null;
    if (activity.client) return activity.client;
    if (activity.user) return activity.user;
    if (activity.customer) return activity.customer;
    return null;
  }, [activity]);

  const fullName = useMemo(() => {
    if (!client) return "Cliente desconocido";
    if (client.displayName) return client.displayName;
    const composed = [client.firstName, client.lastName]
      .filter(Boolean)
      .join(" ")
      .trim();
    return composed || "Cliente desconocido";
  }, [client]);

  const dateTimeLabel = getDateTimeLabel(activity);
  const amountLabel =
    typeof activity?.amount === "number"
      ? formatPrice(activity.amount)
      : activity?.amount
      ? formatPrice(Number(activity.amount))
      : null;

  return (
    <View style={styles.activityDetail__summaryCard}>
      <Text style={styles.activityDetail__summaryLabel}>Trabajo para</Text>
      <Text style={styles.activityDetail__summaryName}>{fullName}</Text>
      <Text style={styles.activityDetail__summaryDate}>{dateTimeLabel}</Text>

      {amountLabel ? (
        <Text style={styles.activityDetail__summaryAmount}>
          {amountLabel}
        </Text>
      ) : null}
    </View>
  );
};

export default SummaryCard;
