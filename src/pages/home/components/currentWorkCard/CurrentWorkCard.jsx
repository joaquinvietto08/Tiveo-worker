import React, { useContext, useMemo } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./CurrentWorkCardStyles";
import { UserContext } from "../../../../context/UserContext";
import { translateStatus } from "../../../../utils/formatHelpers";

const CurrentWorkCard = ({ onPress }) => {
  const { activities } = useContext(UserContext);

  // --- Lógica para determinar qué activity mostrar ---
  const currentActivity = useMemo(() => {
    if (!activities?.length) return null;

    // Filtramos las actividades con status válidos
    const activeStatuses = ["confirm", "going", "on-progress", "done"];
    const validActivities = activities.filter((a) =>
      activeStatuses.includes(a.status)
    );

    if (!validActivities.length) return null;

    // 1️⃣ Si hay alguna con going / on-progress / done → esa es la actual
    const liveActivity = validActivities.find(
      (a) =>
        ["going", "on-progress", "done"].includes(a.status) &&
        a.paymentStatus === "pending"
    );
    if (liveActivity) return liveActivity;

    // 2️⃣ Si solo hay confirm → buscamos la más próxima a la fecha actual
    const now = new Date();
    const upcoming = validActivities
      .filter((a) => a.status === "confirm" && a.scheduledDateTime)
      .map((a) => ({
        ...a,
        diff: new Date(a.scheduledDateTime) - now,
      }))
      .filter((a) => a.diff > 0) // solo futuras
      .sort((a, b) => a.diff - b.diff)[0];

    return upcoming || null;
  }, [activities]);

  // 🚫 Si no hay actividad válida, no se renderiza nada
  if (!currentActivity) return null;

  // --- Extraemos datos ---
  const { description, user, address, status, id } = currentActivity;

  return (
    <TouchableOpacity
      style={styles.home__currentWork__container}
      activeOpacity={0.85}
      onPress={() => onPress(id)}
    >
      <View style={styles.home__currentWork__left}>
        <View style={styles.home__currentWork__statusDot} />
        <Text style={styles.home__currentWork__statusText}>
          {status === "confirm" ? "Proximo trabajo" : translateStatus(status).toLowerCase()
}
        </Text>
      </View>

      <View style={styles.home__currentWork__info}>
        <Text style={styles.home__currentWork__title}>
          {description || "Trabajo sin descripción"}
        </Text>
        <Text style={styles.home__currentWork__client}>
          {user?.displayName || "Cliente desconocido"}
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
};

export default CurrentWorkCard;
