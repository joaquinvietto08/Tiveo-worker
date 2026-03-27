import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./StateModalStyles";

const StateModal = ({ visible, currentStatus, onClose, onSelect }) => {
  const states = [
    { label: "Activo", desc: "Disponible para nuevos trabajos", color: "#00B383" },
    { label: "Ocupado", desc: "En un trabajo actualmente", color: "#E6A600" },
    { label: "Inactivo", desc: "No disponible temporalmente", color: "#BC0000" },
  ];

  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent={true}>
      <View style={styles.state__modal__overlay}>
        <View style={styles.state__modal__card}>
          <View style={styles.state__modal__header}>
            <Text style={styles.state__modal__title}>Cambiar estado</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={20} color="#333" />
            </TouchableOpacity>
          </View>

          {states.map((item) => {
            const selected = item.label === currentStatus;
            return (
              <TouchableOpacity
                key={item.label}
                style={
                  selected
                    ? [styles.state__modal__option, styles.state__modal__option__selected]
                    : styles.state__modal__option
                }
                onPress={() => onSelect(item.label)}
                activeOpacity={0.8}
              >
                <View style={styles.state__modal__optionLeft}>
                  <View style={[styles.state__modal__dot, { backgroundColor: item.color }]} />
                  <View>
                    <Text style={styles.state__modal__optionLabel}>{item.label}</Text>
                    <Text style={styles.state__modal__optionDesc}>{item.desc}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </Modal>
  );
};

export default StateModal;
