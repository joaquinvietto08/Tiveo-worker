import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from "./DescriptionStyles";

const Description = ({ workerData, setWorkerData, onNext, onBack, mode = "create" }) => {
  const isEditMode = mode === "edit";

  const handleContinue = () => {
    if (workerData.description.trim()) {
      onNext();
    }
  };

  return (
    <View style={styles.description__mainContainer}>
      <Text style={styles.description__title}>
        {isEditMode ? "Editar perfil de trabajador" : "Crear perfil de trabajador"}
      </Text>
      <Text style={styles.description__step}>Paso 3 de 4</Text>

      <View style={styles.description__progressContainer}>
        <View style={styles.description__progressBar} />
      </View>

      <Text style={styles.description__sectionTitle}>
        Descripción profesional
      </Text>
      <Text style={styles.description__sectionSubtitle}>
        Cuéntales a tus clientes sobre tu experiencia
      </Text>

      <TextInput
        placeholder="Ej: Arreglo, armado y calibrado de guitarras. Luthier recibido en la UNC con más de 7 años de experiencia."
        value={workerData.description}
        onChangeText={(text) =>
          setWorkerData({ ...workerData, description: text })
        }
        style={styles.description__textArea}
        placeholderTextColor={styles.placeholder.color}
        multiline
        maxLength={300}
      />

      <Text style={styles.description__charCount}>
        {workerData.description.length}/300
      </Text>

      <View style={styles.description__buttonsRow}>
        <TouchableOpacity
          style={styles.description__backButton}
          onPress={onBack}
        >
          <Text style={styles.description__backButtonText}>Atrás</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.description__button,
            !workerData.description && { backgroundColor: "#ccc" },
          ]}
          onPress={handleContinue}
          disabled={!workerData.description}
        >
          <Text style={styles.description__buttonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Description;
