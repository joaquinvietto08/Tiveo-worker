import React, { useContext, useMemo } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./CurrentWorkCardStyles";
import { UserContext } from "../../../../context/UserContext";
import { translateStatus } from "../../../../utils/formatHelpers";

const CurrentWorkCard = ({ onPress }) => {
  const { activities } = useContext(UserContext);

  // --- Lógica para determinar qué activities mostrar ---
  const currentActivities = useMemo(() => {
    if (!activities?.length) return [];

    const validStatuses = [
      "confirm",
      "going",
      "on-progress",
      "done",
      "starting",
    ];
    const validActivities = activities.filter((a) =>
      validStatuses.includes(a.status)
    );
    if (!validActivities.length) return [];

    // 1️⃣ Buscar la primera "activa" (going / on-progress / done)
    const liveActivity = validActivities.find(
      (a) =>
        ["going", "on-progress", "done"].includes(a.status) &&
        a.paymentStatus === "created"
    );

    // 2️⃣ Buscar todas las "starting"
    const startingActivities = validActivities.filter(
      (a) => a.status === "starting"
    );

    // 3️⃣ Si no hay ninguna activa, buscar la confirm más próxima
    let upcomingActivity = null;
    if (!liveActivity) {
      // 🔹 Si hay alguna con moment "now", usamos la primera directamente
      const nowMomentActivity = validActivities.find(
        (a) =>
          a.moment === "now" &&
          ["confirm", "going", "on-progress", "starting"].includes(a.status) &&
          a.paymentStatus === "pending"
      );

      if (nowMomentActivity) {
        upcomingActivity = nowMomentActivity;
      } else {
        // 🔹 Si no hay ninguna "now" válida, buscamos la confirm más próxima
        const now = new Date();
        const upcomingList = validActivities
          .filter((a) => a.status === "confirm" && a.scheduledDateTime)
          .map((a) => ({
            ...a,
            diff: new Date(a.scheduledDateTime) - now,
          }))
          .filter((a) => a.diff > 0)
          .sort((a, b) => a.diff - b.diff);

        upcomingActivity = upcomingList[0] || null;
      }
    }

    // --- Orden final ---
    // Si hay liveActivity → primero esa, luego todos los starting
    // Si no hay liveActivity → primero upcoming, luego todos los starting
    const allToShow = [];
    if (liveActivity) allToShow.push(liveActivity);
    else if (upcomingActivity) allToShow.push(upcomingActivity);

    // Evitar duplicado si la primera ya es una starting
    const firstId = allToShow[0]?.id;
    startingActivities.forEach((s) => {
      if (s.id !== firstId) allToShow.push(s);
    });

    return allToShow;
  }, [activities]);

  // 🚫 Si no hay ninguna actividad, no se renderiza nada
  if (!currentActivities.length) return null;

  return (
    <>
      {currentActivities.map((activity) => {
        const { description, client, address, status, id } = activity;
        return (
          <TouchableOpacity
            key={id}
            style={styles.home__currentWork__container}
            activeOpacity={0.85}
            onPress={() => onPress(id)}
          >
            <View style={styles.home__currentWork__left}>
              <View style={styles.home__currentWork__statusDot} />
              <Text style={styles.home__currentWork__statusText}>
                {status === "confirm" || status === "starting"
                  ? "próximo trabajo"
                  : translateStatus(status).toLowerCase()}
              </Text>
            </View>

            <View style={styles.home__currentWork__info}>
              <Text style={styles.home__currentWork__title}>
                {description || "Trabajo sin descripción"}
              </Text>
              <Text style={styles.home__currentWork__client}>
                {client?.displayName || "Cliente desconocido"}
              </Text>
              <View style={styles.home__currentWork__locationRow}>
                <MaterialIcons name="location-on" size={16} color="#fff" />
                <Text style={styles.home__currentWork__locationText}>
                  {address?.address || "Ubicación no disponible"}
                </Text>
              </View>
            </View>

            <MaterialIcons
              name="chevron-right"
              size={24}
              color="#fff"
              style={styles.home__currentWork__arrow}
            />
          </TouchableOpacity>
        );
      })}
    </>
  );
};

export default CurrentWorkCard;
