import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./SchedulesStyles";
import { UserContext } from "../../../../../context/UserContext";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { FIREBASE_APP } from "../../../../../config/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import Busy from "../../../../../../assets/svgs/worker/busy.svg";
import Available from "../../../../../../assets/svgs/worker/available.svg";
import { colors } from "../../../../../styles/globalStyles";
import { getIcon } from "../../../../../utils/getIcons";
import { translateService } from "../../../../../utils/formatHelpers";

const Schedules = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { activities } = useContext(UserContext);
  const navigation = useNavigation();

  const activeActivities = activities.filter(
    (item) => item.status !== "done" && item.status !== "cancelled"
  );

  const handleStartJob = async (activityId) => {
    try {
      const db = getFirestore(FIREBASE_APP);
      const activityRef = doc(db, "activities", activityId);
      await updateDoc(activityRef, {
        status: "starting",
      });
      navigation.navigate("CurrentWork", { activityId });
      console.log(`✅ Trabajo ${activityId} marcado como "starting"`);
    } catch (error) {
      console.error("❌ Error al actualizar estado:", error);
    }
  };

  // 🔽 Ordenar por prioridad
  const sortedActivities = [...activeActivities].sort((a, b) => {
    // 1️⃣ Prioridad: trabajos "now"
    if (a.moment === "now" && b.moment !== "now") return -1;
    if (a.moment !== "now" && b.moment === "now") return 1;

    // 2️⃣ Si ambos son "scheduled", ordenar por fecha más próxima
    if (a.moment === "scheduled" && b.moment === "scheduled") {
      const dateA = new Date(a.scheduledDateTime || 0);
      const dateB = new Date(b.scheduledDateTime || 0);
      return dateA - dateB;
    }

    return 0;
  });

  const renderCard = (item) => {
    const hasDescription = item.description && item.description.trim() !== "";
    const hasServices = item.services?.length > 0;

    return (
      <View key={item.id} style={styles.schedules__card}>
        {/* Descripción */}
        <Text
          style={
            hasDescription
              ? styles.schedules__title
              : [styles.schedules__title, styles.schedules__title__italic]
          }
        >
          {hasDescription ? item.description : "Sin descripción"}
        </Text>

        {/* Cliente */}
        <Text style={styles.schedules__client}>
          {item.user?.displayName || "Usuario desconocido"}
        </Text>

        {/* Dirección */}
        <Text style={styles.schedules__sectionLabel}>Dirección</Text>
        <View style={styles.schedules__iconText}>
          <Ionicons name="location-sharp" size={18} color="#000" />
          <Text style={styles.schedules__text}>
            {item.address?.address || "No disponible"}
            {item.address?.floor ? `, ${item.address.floor}` : ""}
          </Text>
        </View>

        {/* Fecha y hora */}
        <Text style={styles.schedules__sectionLabel}>Fecha y hora</Text>
        <View style={styles.schedules__momentRow}>
          {item.moment === "now" ? (
            <>
              <Available
                height={22}
                width={22}
                fill={colors.primary}
                style={styles.advanceSearch__footer__detailIcon}
              />
              <Text style={styles.schedules__momentNow}>Ahora mismo</Text>
            </>
          ) : (
            <>
              <Busy
                height={22}
                width={22}
                fill={colors.black}
                style={styles.advanceSearch__footer__detailIcon}
              />
              <Text style={styles.schedules__momentScheduled}>
                Martes 16 de junio 17:30 hs
              </Text>
            </>
          )}
        </View>

        {/* Categorías */}
        {hasServices && (
          <View style={styles.schedules__servicesContainer}>
            <Text style={styles.schedules__sectionLabel}>Categorías</Text>
            <View style={styles.schedules__chipsRow}>
              {item.services.map((srv, i) => {
                const ServiceIcon = getIcon(srv);
                return (
                  <View key={i} style={styles.schedules__chip}>
                    <ServiceIcon width={16} height={16} />
                    <Text style={styles.schedules__chipText}>
                      {translateService(srv)}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {/* Botones */}
        <View style={styles.schedules__buttonsRow}>
          <TouchableOpacity style={styles.schedules__buttonDetails}>
            <Text style={styles.schedules__buttonDetailsText}>
              Ver detalles
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.schedules__buttonStart}
            onPress={() => handleStartJob(item.id)}
          >
            <Text style={styles.schedules__buttonStartText}>
              Comenzar trabajo
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <ScrollView
      style={styles.schedules__scroll}
      contentContainerStyle={styles.schedules__container}
      showsVerticalScrollIndicator={false}
    >
      {sortedActivities?.length > 0 ? (
        sortedActivities.map((item) => renderCard(item))
      ) : (
        <Text style={styles.schedules__emptyText}>
          No hay trabajos programados
        </Text>
      )}

      {/* Modal de preview imagen (por si lo necesitás más adelante) */}
      <Modal visible={!!selectedImage} transparent animationType="fade">
        <View style={styles.schedules__modalOverlay}>
          <TouchableOpacity
            style={styles.schedules__modalOverlay}
            onPress={() => setSelectedImage(null)}
            activeOpacity={1}
          >
            <Image
              source={{ uri: selectedImage }}
              style={styles.schedules__modalImage}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Schedules;
