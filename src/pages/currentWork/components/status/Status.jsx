import React from "react";
import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./StatusStyles";
import { colors } from "../../../../styles/globalStyles";

const Status = ({ status }) => {
  const steps = [
    {
      key: "going",
      title: "En camino",
      subtitle: "Dirigiéndome al domicilio del cliente",
      color: "#4E73DF",
      icon: "check",
    },
    {
      key: "on-progress",
      title: "Trabajando",
      subtitle: "Realizando el trabajo en este momento",
      color: "#F6C23E",
      icon: "circle",
    },
    {
      key: "done",
      title: "Completado",
      subtitle: "Trabajo finalizado - Listo para cobrar",
      color: colors.green,
      icon: "radio-button-unchecked",
    },
  ];

  // Helper para determinar si un paso está activo
  const isActive = (stepKey) => {
    if (status === "on-progress" && stepKey === "going") return true;
    if (status === "done" && ["going", "on-progress"].includes(stepKey))
      return true;
    return status === stepKey;
  };

  return (
    <View style={styles.currentWork__status__container}>
      <Text style={styles.currentWork__status__title}>
        Progreso del trabajo
      </Text>

      {steps.map((step) => {
        const active = isActive(step.key);
        const completed =
          status === "done" && step.key === "done" ? true : false;

        return (
          <View key={step.key} style={styles.currentWork__status__row}>
            <View
              style={[
                styles.currentWork__status__iconContainer,
                active
                  ? { backgroundColor: step.color }
                  : { backgroundColor: colors.lightGray },
              ]}
            >
              {active && step.key === "going" ? (
                <View style={styles.currentWork__status__circleActive} />
              ) : active && step.key === "on-progress" ? (
                <View style={styles.currentWork__status__circleActive} />
              ) : (
                <View style={styles.currentWork__status__circleInactive} />
              )}
            </View>

            <View>
              <Text
                style={[
                  styles.currentWork__status__stepTitle,
                  completed && { color: colors.black },
                ]}
              >
                {step.title}
              </Text>
              <Text
                style={[
                  styles.currentWork__status__stepSubtitle,
                  completed && { color: colors.gray },
                ]}
              >
                {step.subtitle}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default Status;
