import React, { useContext, useMemo } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./CurrentWorkCardStyles";
import { UserContext } from "../../../../context/UserContext";
import { translateStatus } from "../../../../utils/formatHelpers";
import { getCurrentWorkActivities } from "./getCurrentWorkActivities";

const CurrentWorkCard = ({ onPress }) => {
  const { activities } = useContext(UserContext);

  const currentActivities = useMemo(
    () => getCurrentWorkActivities(activities),
    [activities]
  );

  // 🚫 Si no hay ninguna actividad, no se renderiza nada
  if (!currentActivities.length) return null;

  return (
    <>
      {currentActivities.map((activity) => {
        const { description, client, address, status, id, warranty } = activity;
        const isWarranty = warranty === "claimed";
        
        return (
          <TouchableOpacity
            key={id}
            style={[
              styles.home__currentWork__container,
              isWarranty && styles.home__currentWork__container__warranty,
            ]}
            activeOpacity={0.85}
            onPress={() => onPress(id)}
          >
            <View style={styles.home__currentWork__left}>
              <View
                style={[
                  styles.home__currentWork__statusDot,
                  isWarranty && styles.home__currentWork__statusDot__warranty,
                ]}
              />
              <Text style={styles.home__currentWork__statusText}>
                {isWarranty
                  ? "reclamo de garantía"
                  : status === "confirm" || status === "starting"
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
