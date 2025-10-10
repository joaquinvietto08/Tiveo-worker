import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./StateStyles";
import StateModal from "./stateModal/StateModal";

const State = () => {
  const [status, setStatus] = useState("Activo");
  const [showModal, setShowModal] = useState(false);

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
        >
          <View style={getDotStyle()} />
          <Text style={getTextStyle()}>{status}</Text>
        </TouchableOpacity>

        <View style={styles.home__state__locationChip}>
          <Ionicons name="location-sharp" size={16} color="#8D8D8D" />
          <Text style={styles.home__state__locationText}>Córdoba Capital</Text>
        </View>
      </View>

      {showModal && (
        <StateModal
          visible={showModal}
          currentStatus={status}
          onClose={() => setShowModal(false)}
          onSelect={(newStatus) => {
            setStatus(newStatus);
            setShowModal(false);
          }}
        />
      )}
    </View>
  );
};

export default State;
