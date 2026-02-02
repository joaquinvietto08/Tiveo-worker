import React, { useContext, useMemo, useState } from "react";
import { Text, View, TouchableOpacity, Modal } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./CurrentWorkCardStyles";
import { UserContext } from "../../../../context/UserContext";
import { translateStatus } from "../../../../utils/formatHelpers";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { FIREBASE_APP } from "../../../../config/firebaseConfig";
import { colors } from "../../../../styles/globalStyles";

const CurrentWorkCard = ({ onPress, navigation }) => {
  const { activities } = useContext(UserContext);
  const [solvingWarranty, setSolvingWarranty] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedActivityId, setSelectedActivityId] = useState(null);

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
      validStatuses.includes(a.status) || a.warranty === "claimed"
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

    // 4️⃣ Buscar todas las actividades con warranty === "claimed"
    const warrantyActivities = validActivities.filter(
      (a) => a.warranty === "claimed"
    );

    // --- Orden final ---
    // Si hay liveActivity → primero esa, luego todos los starting, luego warranty
    // Si no hay liveActivity → primero upcoming, luego todos los starting, luego warranty
    const allToShow = [];
    if (liveActivity) allToShow.push(liveActivity);
    else if (upcomingActivity) allToShow.push(upcomingActivity);

    // Evitar duplicado si la primera ya es una starting
    const firstId = allToShow[0]?.id;
    startingActivities.forEach((s) => {
      if (s.id !== firstId) allToShow.push(s);
    });

    // Agregar actividades de garantía al final
    warrantyActivities.forEach((w) => {
      if (w.id !== firstId && !allToShow.find((a) => a.id === w.id)) {
        allToShow.push(w);
      }
    });

    return allToShow;
  }, [activities]);

  const handleSolveWarrantyClick = (activityId) => {
    setSelectedActivityId(activityId);
    setShowConfirmModal(true);
  };

  const handleConfirmSolve = async () => {
    if (!selectedActivityId) return;
    
    try {
      setSolvingWarranty(selectedActivityId);
      const db = getFirestore(FIREBASE_APP);
      const activityRef = doc(db, "activities", selectedActivityId);
      await updateDoc(activityRef, {
        warranty: "solved",
      });
      console.log(`✅ Garantía ${selectedActivityId} marcada como "solved"`);
      setShowConfirmModal(false);
      setSelectedActivityId(null);
    } catch (error) {
      console.error("❌ Error al resolver garantía:", error);
    } finally {
      setSolvingWarranty(null);
    }
  };

  const handleCancelSolve = () => {
    setShowConfirmModal(false);
    setSelectedActivityId(null);
  };

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
            onPress={() => {
              if (isWarranty) {
                navigation?.navigate("Messages", { activity });
              } else {
                onPress(id);
              }
            }}
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
              {isWarranty && (
                <TouchableOpacity
                  style={styles.home__currentWork__solveButton}
                  onPress={() => handleSolveWarrantyClick(id)}
                  disabled={solvingWarranty === id}
                  activeOpacity={0.8}
                >
                  <Text style={styles.home__currentWork__solveButtonText}>
                    {solvingWarranty === id ? "Resolviendo..." : "Marcar como solucionado"}
                  </Text>
                </TouchableOpacity>
              )}
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

      {/* Modal de confirmación */}
      <Modal
        transparent
        visible={showConfirmModal}
        animationType="fade"
        onRequestClose={handleCancelSolve}
      >
        <View style={styles.home__currentWork__modalOverlay}>
          <View style={styles.home__currentWork__modalCard}>
            <Text style={styles.home__currentWork__modalTitle}>
              Marcar como solucionado
            </Text>
            <Text style={styles.home__currentWork__modalMessage}>
              ¿Estás seguro de que deseas marcar este reclamo de garantía como solucionado?
            </Text>
            <View style={styles.home__currentWork__modalButtonsRow}>
              <TouchableOpacity
                style={styles.home__currentWork__modalButtonCancel}
                onPress={handleCancelSolve}
                activeOpacity={0.9}
              >
                <Text style={styles.home__currentWork__modalButtonCancelText}>
                  Cancelar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.home__currentWork__modalButtonConfirm}
                onPress={handleConfirmSolve}
                activeOpacity={0.9}
                disabled={solvingWarranty === selectedActivityId}
              >
                <Text style={styles.home__currentWork__modalButtonConfirmText}>
                  Marcar como solucionado
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default CurrentWorkCard;
