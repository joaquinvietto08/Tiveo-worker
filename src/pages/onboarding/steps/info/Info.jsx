import React from "react";
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { styles } from "./InfoStyles";

const Info = ({ workerData, setWorkerData, onNext }) => {

  const handleContinue = () => {
    if (
      workerData.name.trim() &&
      workerData.lastName.trim() &&
      workerData.workerName.trim()
    ) {
      onNext();
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.info__mainContainer}>
            <Text style={styles.info__title}>Crear perfil de trabajador</Text>
            <Text style={styles.info__step}>Paso 1 de 4</Text>

            <View style={styles.info__progressContainer}>
              <View style={styles.info__progressBar} />
            </View>

            <Text style={styles.info__sectionTitle}>Información personal</Text>
            <Text style={styles.info__sectionSubtitle}>
              Ingresa tus datos básicos para comenzar
            </Text>

            <Text style={styles.info__label}>Nombre</Text>
            <TextInput
              value={workerData.name}
              onChangeText={(text) => setWorkerData({ ...workerData, name: text })}
              style={styles.info__input}
              placeholderTextColor={styles.placeholder.color}
            />

            <Text style={styles.info__label}>Apellido</Text>
            <TextInput
              value={workerData.lastName}
              onChangeText={(text) =>
                setWorkerData({ ...workerData, lastName: text })
              }
              style={styles.info__input}
              placeholderTextColor={styles.placeholder.color}
            />

            <Text style={styles.info__label}>Nombre de trabajador</Text>
            <TextInput
              placeholder="Ej: Juan Electricista"
              value={workerData.workerName}
              onChangeText={(text) =>
                setWorkerData({ ...workerData, workerName: text })
              }
              style={styles.info__input}
              placeholderTextColor={styles.placeholder.color}
            />

            <Text style={styles.info__helperText}>Este será tu nombre público</Text>

            <TouchableOpacity
              style={[
                styles.info__button,
                (!workerData.name ||
                  !workerData.lastName ||
                  !workerData.workerName) && { backgroundColor: "#ccc" },
              ]}
              onPress={handleContinue}
              disabled={
                !workerData.name ||
                !workerData.lastName ||
                !workerData.workerName
              }
            >
              <Text style={styles.info__buttonText}>Continuar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Info;
