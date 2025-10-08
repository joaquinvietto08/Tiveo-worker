import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./ServicesStyles";

const mockServices = [
  { id: "1", name: "Electricidad" },
  { id: "2", name: "Plomería" },
  { id: "3", name: "Pintura" },
  { id: "4", name: "Carpintería" },
  { id: "5", name: "Limpieza" },
  { id: "6", name: "Jardinería" },
];

const OnboardingServices = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const [selectedServices, setSelectedServices] = useState([]);
  const { name, lastName, workerName, photo, description } = route.params || {};

  const handleSelect = (id) => {
    if (selectedServices.includes(id)) {
      setSelectedServices(selectedServices.filter((s) => s !== id));
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  const handleFinish = () => {
    const profileData = {
      name,
      lastName,
      workerName,
      photo,
      description,
      services: selectedServices,
    };
    console.log("Perfil final:", profileData);
    navigation.replace("Home"); // o cualquier pantalla principal que tengas
  };

  return (
    <View
      style={[
        styles.onboardingServices__mainContainer,
        { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20 },
      ]}
    >
      <Text style={styles.onboardingServices__title}>Crear perfil de trabajador</Text>
      <Text style={styles.onboardingServices__step}>Paso 4 de 4</Text>

      <View style={styles.onboardingServices__progressContainer}>
        <View style={styles.onboardingServices__progressBar} />
      </View>

      <Text style={styles.onboardingServices__sectionTitle}>Seleccioná tus servicios</Text>
      <Text style={styles.onboardingServices__sectionSubtitle}>
        Elegí los rubros en los que querés ofrecer tus servicios
      </Text>

      <FlatList
        data={mockServices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isSelected = selectedServices.includes(item.id);
          return (
            <TouchableOpacity
              style={[
                styles.onboardingServices__option,
                isSelected && styles.onboardingServices__optionSelected,
              ]}
              onPress={() => handleSelect(item.id)}
            >
              <Text
                style={[
                  styles.onboardingServices__optionText,
                  isSelected && styles.onboardingServices__optionTextSelected,
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <TouchableOpacity
        style={[
          styles.onboardingServices__button,
          selectedServices.length === 0 && { backgroundColor: "#ccc" },
        ]}
        onPress={handleFinish}
        disabled={selectedServices.length === 0}
      >
        <Text style={styles.onboardingServices__buttonText}>Finalizar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingServices;
