import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import { styles } from "./ServicesStyles";
import { servicesData } from "../../../../utils/servicesData"; // ajustá ruta también
import { translateService } from "../../../../utils/formatHelpers";

const Services = ({ workerData, setWorkerData, onBack, onFinish }) => {
  const [selected, setSelected] = useState(workerData.services || []);

  const handleToggle = (service) => {
    if (selected.includes(service)) {
      setSelected(selected.filter((s) => s !== service));
    } else {
      setSelected([...selected, service]);
    }
  };

  const handleFinish = () => {
    setWorkerData({ ...workerData, services: selected });
    onFinish();
  };

  const renderService = ({ item }) => {
    const isSelected = selected.includes(item.name);
    const label = translateService(item.name) || item.name;

    return (
      <TouchableOpacity
        style={[
          styles.services__card,
          isSelected && styles.services__cardSelected,
        ]}
        onPress={() => handleToggle(item.name)}
        activeOpacity={0.8}
      >
        <Text
          style={[
            styles.services__label,
            isSelected && styles.services__labelSelected,
          ]}
        >
          {label}
        </Text>
        {isSelected && <Text style={styles.services__check}>✓</Text>}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.services__mainContainer}>
      <Text style={styles.services__title}>Categorías de servicio</Text>
      <Text style={styles.services__subtitle}>
        Selecciona los servicios que ofreces
      </Text>

      <FlatList
        data={servicesData}
        keyExtractor={(item) => item.key}
        renderItem={renderService}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />

      <Text style={styles.services__helperText}>
        Puedes seleccionar múltiples categorías
      </Text>

      <View style={styles.services__buttonsRow}>
        <TouchableOpacity style={styles.services__backButton} onPress={onBack}>
          <Text style={styles.services__backButtonText}>Atrás</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.services__button,
            selected.length === 0 && { backgroundColor: "#ccc" },
          ]}
          onPress={handleFinish}
          disabled={selected.length === 0}
        >
          <Text style={styles.services__buttonText}>Crear perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Services;
