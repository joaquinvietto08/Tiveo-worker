import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from "./InfoStyles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Info = ({ workerData, setWorkerData, onNext }) => {
  const handleContinue = () => {
    if (
      workerData.name.trim() &&
      workerData.lastName.trim() &&
      workerData.workerName.trim() &&
      workerData.birthDate.trim() &&
      workerData.phone.trim()
    ) {
      onNext();
    }
  };

  return (
    <View style={styles.info__mainContainer}>
      <Text style={styles.info__title}>Crear perfil de trabajador</Text>
      <Text style={styles.info__step}>Paso 1 de 4</Text>

      <View style={styles.info__progressContainer}>
        <View style={styles.info__progressBar} />
      </View>

      <KeyboardAwareScrollView
        style={styles.jobApply__scroll}
        contentContainerStyle={styles.jobApply__scrollContent}
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
        extraScrollHeight={20}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.info__sectionTitle}>Información personal</Text>
        <Text style={styles.info__sectionSubtitle}>
          Ingresa tus datos básicos para comenzar
        </Text>

        {/* Nombre */}
        <Text style={styles.info__label}>Nombre</Text>
        <TextInput
          value={workerData.name}
          onChangeText={(text) => setWorkerData({ ...workerData, name: text })}
          style={styles.info__input}
          placeholderTextColor={styles.placeholder.color}
        />

        {/* Apellido */}
        <Text style={styles.info__label}>Apellido</Text>
        <TextInput
          value={workerData.lastName}
          onChangeText={(text) =>
            setWorkerData({ ...workerData, lastName: text })
          }
          style={styles.info__input}
          placeholderTextColor={styles.placeholder.color}
        />

        {/* Nombre de trabajador */}
        <Text style={styles.info__label}>Nombre de trabajador</Text>
        <TextInput
          placeholder="Ej: Soluciones Córdoba"
          value={workerData.workerName}
          onChangeText={(text) =>
            setWorkerData({ ...workerData, workerName: text })
          }
          style={styles.info__input}
          placeholderTextColor={styles.placeholder.color}
        />
        <Text style={styles.info__helperText}>Este será tu nombre público</Text>

        {/* Fecha de nacimiento */}
        <Text style={styles.info__label}>Fecha de nacimiento</Text>
        <TextInput
          placeholder="DD/MM/AAAA"
          value={workerData.birthDate}
          onChangeText={(text) => {
            // Eliminar cualquier carácter que no sea número
            let formatted = text.replace(/\D/g, "");

            // Insertar "/" después del día y mes
            if (formatted.length > 2) {
              formatted = formatted.slice(0, 2) + "/" + formatted.slice(2);
            }
            if (formatted.length > 5) {
              formatted = formatted.slice(0, 5) + "/" + formatted.slice(5, 9);
            }

            // Limitar longitud total
            if (formatted.length > 10) {
              formatted = formatted.slice(0, 10);
            }

            setWorkerData({ ...workerData, birthDate: formatted });
          }}
          style={styles.info__input}
          placeholderTextColor={styles.placeholder.color}
          keyboardType="numeric"
        />

        {/* Celular */}
        <Text style={styles.info__label}>Número de celular</Text>
        <TextInput
          value={workerData.phone}
          onChangeText={(text) => setWorkerData({ ...workerData, phone: text })}
          style={styles.info__input}
          placeholderTextColor={styles.placeholder.color}
          keyboardType="phone-pad"
        />

        {/* Botón continuar */}
        <TouchableOpacity
          style={[
            styles.info__button,
            (!workerData.name ||
              !workerData.lastName ||
              !workerData.workerName ||
              !workerData.birthDate ||
              !workerData.phone) && { backgroundColor: "#ccc" },
          ]}
          onPress={handleContinue}
          disabled={
            !workerData.name ||
            !workerData.lastName ||
            !workerData.workerName ||
            !workerData.birthDate ||
            !workerData.phone
          }
        >
          <Text style={styles.info__buttonText}>Continuar</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Info;
