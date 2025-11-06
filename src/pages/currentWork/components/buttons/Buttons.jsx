import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./ButtonsStyles";
import { UserContext } from "../../../../context/UserContext";
import { colors } from "../../../../styles/globalStyles";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { FIREBASE_APP } from "../../../../config/firebaseConfig";
import { useNavigation } from "@react-navigation/native";

const Buttons = ({ activity }) => {
  const { activities, setActivities } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // --- Avanzar estado ---
  const handleNextStatus = async () => {
    // Si el trabajo ya está finalizado, navegar a la pantalla de cobro
    if (activity.status === "done") {
      navigation.navigate("Payment", { activity });
      return;
    }
    const nextStatusMap = {
      confirm: "going",
      going: "on-progress",
      "on-progress": "done",
      done: "done",
    };

    const updatedStatus = nextStatusMap[activity.status] || "confirm";
    setLoading(true);

    try {
      const db = getFirestore(FIREBASE_APP); // ✅ instancia de Firestore
      const activityRef = doc(db, "activities", activity.id);
      await updateDoc(activityRef, { status: updatedStatus });
      console.log(`✅ Estado actualizado a: ${updatedStatus}`);

      // Actualizamos también el contexto local
      const updatedActivities = activities.map((a) =>
        a.id === activity.id ? { ...a, status: updatedStatus } : a
      );
      setActivities(updatedActivities);
    } catch (error) {
      console.error("❌ Error al actualizar el estado:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- Retroceder estado ---
  const handlePrevStatus = async () => {
    const prevStatusMap = {
      "on-progress": "going",
      going: "confirm",
      done: "on-progress",
    };

    const updatedStatus = prevStatusMap[activity.status] || "confirm";
    setLoading(true);

    try {
      const db = getFirestore(FIREBASE_APP); // ✅ misma instancia
      const activityRef = doc(db, "activities", activity.id);
      await updateDoc(activityRef, { status: updatedStatus });
      console.log(`✅ Estado retrocedido a: ${updatedStatus}`);

      const updatedActivities = activities.map((a) =>
        a.id === activity.id ? { ...a, status: updatedStatus } : a
      );
      setActivities(updatedActivities);
    } catch (error) {
      console.error("❌ Error al retroceder el estado:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- Configuración visual del botón principal ---
  const getActionButtonData = () => {
    switch (activity.status) {
      case "confirm":
        return {
          text: "Marcar como en camino",
          icon: "directions-walk",
          color: "#4E73DF",
        };
      case "starting":
        return {
          text: "Marcar como en camino",
          icon: "directions-walk",
          color: "#4E73DF",
        };
      case "going":
        return {
          text: "Marcar como trabajando",
          icon: "handyman",
          color: "#F6C23E",
        };
      case "on-progress":
        return {
          text: "Marcar como completado",
          icon: "check",
          color: colors.green,
        };
      default:
        return activity.status === "done"
          ? {
              text: "Cobrar trabajo",
              icon: "attach-money",
              color: colors.primary,
            }
          : {
              text: "Marcar como en camino",
              icon: "directions-walk",
              color: "#4E73DF",
            };
    }
  };

  const actionData = getActionButtonData();
  const canGoBack =
    activity.status !== "confirm" && activity.status !== "starting";

  return (
    <View style={styles.currentWork__buttons__container}>
      {/* Botón principal (avanzar estado) */}
      <TouchableOpacity
        style={[
          styles.currentWork__buttons__actionBtn,
          { backgroundColor: actionData.color },
        ]}
        activeOpacity={0.85}
        onPress={handleNextStatus}
        disabled={loading}
      >
        <MaterialIcons name={actionData.icon} size={22} color={colors.white} />
        <Text style={styles.currentWork__buttons__actionText}>
          {actionData.text}
        </Text>
      </TouchableOpacity>

      {/* Botón retroceder (solo si no estás en el primero) */}
      {canGoBack && (
        <TouchableOpacity
          style={[
            styles.currentWork__buttons__actionBtn,
            { backgroundColor: colors.lightGray },
          ]}
          activeOpacity={0.85}
          onPress={handlePrevStatus}
        >
          <MaterialIcons name="undo" size={22} color={colors.black} />
          <Text
            style={[
              styles.currentWork__buttons__actionText,
              { color: colors.black },
            ]}
          >
            Volver al paso anterior
          </Text>
        </TouchableOpacity>
      )}

      {/* Botón de mensajes */}
      <TouchableOpacity
        style={styles.currentWork__buttons__messageBtn}
        activeOpacity={0.85}
        onPress={() => navigation.navigate("Messages", { activity })}
      >
        <MaterialIcons
          name="chat-bubble-outline"
          size={20}
          color={colors.white}
        />
        <Text style={styles.currentWork__buttons__messageText}>Mensajes</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Buttons;
