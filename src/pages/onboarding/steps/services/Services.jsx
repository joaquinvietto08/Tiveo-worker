import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { styles } from "./ServicesStyles";
import { servicesData } from "../../../../utils/servicesData";
import { translateService } from "../../../../utils/formatHelpers";
import { getIcon } from "../../../../utils/getIcons";
import { colors } from "../../../../styles/globalStyles";

const Services = ({ workerData, setWorkerData, onBack, onFinish, loading, mode = "create" }) => {
  const isEditMode = mode === "edit";
  const [selected, setSelected] = useState(
    Array.isArray(workerData.services) ? workerData.services : []
  );

  useEffect(() => {
    setWorkerData((prev) => ({ ...prev, services: selected }));
  }, [selected]);

  const handleToggle = (service) => {
    if (selected.includes(service)) {
      setSelected(selected.filter((s) => s !== service));
    } else {
      setSelected([...selected, service]);
    }
  };

  const renderService = ({ item }) => {
    const isSelected = selected.includes(item.name);
    const label = translateService(item.name) || item.name;
    const Icon = getIcon(item.name); // 👈 obtenemos el ícono correspondiente

    return (
      <TouchableOpacity
        style={[
          styles.services__card,
          isSelected && styles.services__cardSelected,
        ]}
        onPress={() => handleToggle(item.name)}
        activeOpacity={0.8}
      >
        <View style={styles.services__iconContainer}>
          {Icon ? <Icon width={28} height={28} fill={colors.black} /> : null}
        </View>
        <Text
          style={[
            styles.services__label,
            isSelected && styles.services__labelSelected,
          ]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.services__mainContainer}>
      <Text style={styles.services__title}>
        {isEditMode ? "Editar perfil de trabajador" : "Crear perfil de trabajador"}
      </Text>
      <Text style={styles.services__step}>Paso 4 de 4</Text>

      <View style={styles.services__progressContainer}>
        <View style={styles.services__progressBar} />
      </View>

      <Text style={styles.services__sectionTitle}>Categorías de servicio</Text>
      <Text style={styles.services__sectionSubtitle}>
        Selecciona los servicios que ofreces
      </Text>

      <FlatList
        data={servicesData}
        keyExtractor={(item) => item.key}
        renderItem={renderService}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between", gap: 10 }}
        contentContainerStyle={{
          paddingHorizontal: 2,
          paddingTop: 2,
        }}
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
            (selected.length === 0 || loading) && { backgroundColor: "#ccc" },
          ]}
          onPress={!loading ? onFinish : null}
          disabled={selected.length === 0 || loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.services__buttonText}>
              {isEditMode ? "Guardar cambios" : "Crear perfil"}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Services;
