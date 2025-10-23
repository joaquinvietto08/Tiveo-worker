import React, { useContext, useMemo } from "react";
import { View, Text } from "react-native";
import { styles } from "./StatsStyles";
import { UserContext } from "../../../../context/UserContext";
import { formatPrice } from "../../../../utils/formatHelpers";

const Stats = ({}) => {
  const { user, activities } = useContext(UserContext);

  // --- Calcular monto total del mes actual ---
  const currentMonthTotal = useMemo(() => {
    if (!activities?.length) return 0;

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return activities
      .filter((a) => {
        if (!a.startedAt || a.paymentStatus === "pending") return false;

        // Convertimos startedAt a Date si es un Timestamp de Firestore
        const startedDate = a.startedAt.toDate
          ? a.startedAt.toDate()
          : new Date(a.startedAt);

        return (
          startedDate.getMonth() === currentMonth &&
          startedDate.getFullYear() === currentYear
        );
      })
      .reduce((acc, curr) => acc + (curr.amount || 0), 0);
  }, [activities]);

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
