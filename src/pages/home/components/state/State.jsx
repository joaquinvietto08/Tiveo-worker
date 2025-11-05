import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { styles } from "./StateStyles";
import StateModal from "./stateModal/StateModal";
import { UserContext } from "../../../../context/UserContext";
import { LocationContext } from "../../../../context/LocationContext";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { FIREBASE_APP } from "../../../../config/firebaseConfig";
import { colors } from "../../../../styles/globalStyles";

const State = () => {
  const { user } = useContext(UserContext);
  const { location, setLocation, trackingCurrent, setTrackingCurrent } = useContext(LocationContext);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const displayLocation = trackingCurrent
    ? "Ubicación actual"
    : location?.name ??
      (location?.formatted_address
        ? location.formatted_address.split(",")[0]
        : "Seleccionar ubicación");

  // Mapeo entre estados en español (UI) y estados en inglés (Firebase)
  const statusMapToFirebase = {
    Activo: "active",
    Ocupado: "busy",
    Inactivo: "inactive",
  };

  const statusMapFromFirebase = {
    active: "Activo",
    busy: "Ocupado",
    inactive: "Inactivo",
  };

  // Obtener el status desde el contexto del usuario, con valor por defecto
  const firebaseStatus = user?.status || "inactive";
  const status = statusMapFromFirebase[firebaseStatus] || "Inactivo";

  const handleStatusChange = async (newStatusLabel) => {
    const newFirebaseStatus = statusMapToFirebase[newStatusLabel];

    if (!user?.uid || !newFirebaseStatus) {
      console.error("❌ Error: No se puede actualizar el estado");
      setShowModal(false);
      return;
    }

    setLoading(true);
    try {
      const db = getFirestore(FIREBASE_APP);
      const workerRef = doc(db, "workers", user.uid);
      await updateDoc(workerRef, { status: newFirebaseStatus });
      console.log(`✅ Estado actualizado a: ${newFirebaseStatus}`);
      setShowModal(false);
    } catch (error) {
      console.error("❌ Error al actualizar el estado:", error);
    } finally {
      setLoading(false);
    }
  };

  const getChipStyle = () => {
    switch (status) {
      case "Activo":
        return [styles.home__state__chip, styles.home__state__chip__active];
      case "Ocupado":
        return [styles.home__state__chip, styles.home__state__chip__busy];
      case "Inactivo":
        return [styles.home__state__chip, styles.home__state__chip__inactive];
      default:
        return styles.home__state__chip;
    }
  };

  const getDotStyle = () => {
    switch (status) {
      case "Activo":
        return [styles.home__state__dot, styles.home__state__dot__active];
      case "Ocupado":
        return [styles.home__state__dot, styles.home__state__dot__busy];
      case "Inactivo":
        return [styles.home__state__dot, styles.home__state__dot__inactive];
      default:
        return styles.home__state__dot;
    }
  };

  const getTextStyle = () => {
    switch (status) {
      case "Activo":
        return [
          styles.home__state__chipText,
          styles.home__state__chipText__active,
        ];
      case "Ocupado":
        return [
          styles.home__state__chipText,
          styles.home__state__chipText__busy,
        ];
      case "Inactivo":
        return [
          styles.home__state__chipText,
          styles.home__state__chipText__inactive,
        ];
      default:
        return styles.home__state__chipText;
    }
  };

  return (
    <View style={styles.home__state__container}>
      <View style={styles.home__state__optionsContainer}>
        <TouchableOpacity
          style={getChipStyle()}
          onPress={() => setShowModal(true)}
          activeOpacity={0.8}
          disabled={loading}
        >
          <View style={getDotStyle()} />
          <Text style={getTextStyle()}>{status}</Text>
        </TouchableOpacity>

        <Pressable
          style={styles.home__state__locationChip}
          onPress={() => {
            setLocation(null);
            setTrackingCurrent(false);
          }}
        >
          {trackingCurrent ? (
            <FontAwesome6 name="location-crosshairs" size={16} color={colors.blue} />
          ) : (
            <Ionicons name="location-sharp" size={16} color="#8D8D8D" />
          )}
          <Text
            style={styles.home__state__locationText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {displayLocation}
          </Text>
        </Pressable>
      </View>

      {showModal && (
        <StateModal
          visible={showModal}
          currentStatus={status}
          onClose={() => setShowModal(false)}
          onSelect={handleStatusChange}
        />
      )}
    </View>
  );
};

export default State;
