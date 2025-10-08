import { View, Text, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { styles } from "./PhotoStyles";

const Photo = ({ workerData, setWorkerData, onNext, onBack }) => {

  const handlePickPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      setWorkerData({ ...workerData, photo: result.assets[0].uri });
    }
  };

  const handleContinue = () => {
    if (workerData.photo) onNext();
  };

  return (
    <View style={styles.photo__mainContainer}>
      <Text style={styles.photo__title}>Crear perfil de trabajador</Text>
      <Text style={styles.photo__step}>Paso 2 de 4</Text>

      <View style={styles.photo__progressContainer}>
        <View style={styles.photo__progressBar} />
      </View>

      <Text style={styles.photo__sectionTitle}>Foto de perfil</Text>
      <Text style={styles.photo__sectionSubtitle}>
        Subí una foto que te represente profesionalmente
      </Text>

      <TouchableOpacity
        style={styles.photo__photoContainer}
        onPress={handlePickPhoto}
      >
        {workerData.photo ? (
          <Image
            source={{ uri: workerData.photo }}
            style={styles.photo__photo}
          />
        ) : (
          <Text style={styles.photo__photoPlaceholder}>Seleccionar foto</Text>
        )}
      </TouchableOpacity>

      <View style={styles.photo__buttonsRow}>
        <TouchableOpacity style={styles.photo__backButton} onPress={onBack}>
          <Text style={styles.photo__backButtonText}>Atrás</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.photo__button,
            !workerData.photo && { backgroundColor: "#ccc" },
          ]}
          onPress={handleContinue}
          disabled={!workerData.photo}
        >
          <Text style={styles.photo__buttonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Photo;
