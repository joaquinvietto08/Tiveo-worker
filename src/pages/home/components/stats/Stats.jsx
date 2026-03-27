import React, { useContext, useMemo } from "react";
import { View, Text } from "react-native";
import { styles } from "./StatsStyles";
import { UserContext } from "../../../../context/UserContext";
import { formatPrice } from "../../../../utils/formatHelpers";

const Stats = ({}) => {
  const { user, payments } = useContext(UserContext);

  // --- Calcular monto total del mes actual ---
  const currentMonthTotal = useMemo(() => {
    if (!payments?.length) return 0;

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const getPaymentDate = (payment) => {
      const status = String(payment.status || "").toLowerCase();
      const rawDate =
        status === "paid" || status === "released"
          ? payment.updatedAt || payment.createdAt
          : payment.createdAt || payment.updatedAt;

      if (!rawDate) return null;
      if (rawDate instanceof Date) return rawDate;
      if (typeof rawDate.toDate === "function") return rawDate.toDate();

      const parsed = new Date(rawDate);
      return Number.isNaN(parsed.getTime()) ? null : parsed;
    };

    return payments
      .filter((payment) => {
        const status = String(payment.status || "").toLowerCase();
        if (status === "pending" || status === "cancelled") return false;
        const paymentDate = getPaymentDate(payment);
        if (!paymentDate) return false;
        return (
          paymentDate.getMonth() === currentMonth &&
          paymentDate.getFullYear() === currentYear
        );
      })
      .reduce((acc, curr) => acc + (Number(curr.totalAmount) || 0), 0);
  }, [payments]);

  return (
    <View style={styles.home__stats__container}>
      {/* Bloque: Trabajos */}
      <View style={styles.home__stats__item}>
        <Text style={styles.home__stats__number}>{user.completedJobs}</Text>
        <Text style={styles.home__stats__label}>Trabajos</Text>
      </View>

      {/* Bloque: Calificación */}
      <View style={styles.home__stats__item}>
        <Text style={styles.home__stats__number}>
          {user.starRating ? user.starRating : "--"}
        </Text>
        <Text style={styles.home__stats__label}>Calificación</Text>
      </View>

      {/* Bloque: Este mes */}
      <View style={styles.home__stats__item}>
        <Text style={styles.home__stats__number}>{formatPrice(currentMonthTotal)}</Text>
        <Text style={styles.home__stats__label}>Este mes</Text>
      </View>
    </View>
  );
};

export default Stats;
