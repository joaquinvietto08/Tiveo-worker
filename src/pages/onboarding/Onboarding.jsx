import React, { useContext, useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./OnboardingStyles";
import Info from "./steps/info/Info";
import Photo from "./steps/photo/Photo";
import Description from "./steps/description/Description";
import Services from "./steps/services/Services";
import { UserContext } from "../../context/UserContext";
import * as FileSystem from "expo-file-system";

const Onboarding = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [currentStep, setCurrentStep] = useState(1);
  const { user } = useContext(UserContext);

  const [workerData, setWorkerData] = useState({
    name: "",
    lastName: "",
    workerName: "",
    phone: "",
    birthDate: "",
    photo: null,
    description: "",
    services: [],
  });

  const [loading, setLoading] = useState(false);

  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handleBack = () => {
    if (!loading) setCurrentStep((prev) => prev - 1);
  };

  const createWorkerProfile = async () => {
    try {
      setLoading(true);

      let photoToSend = workerData.photo;
      if (photoToSend?.startsWith("file://")) {
        photoToSend = await FileSystem.readAsStringAsync(photoToSend, {
          encoding: FileSystem.EncodingType.Base64,
        });
      }

      const response = await fetch(
        "https://us-central1-tiveo-5f6c4.cloudfunctions.net/workerCreate", // ⚠️ reemplazá con tu endpoint real
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            uid: user.uid,
            name: workerData.name,
            lastName: workerData.lastName,
            workerName: workerData.workerName,
            phone: workerData.phone,
            photo: photoToSend,
            banner: workerData.banner || null,
            description: workerData.description,
            services: workerData.services,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.log("❌ Respuesta completa del backend:", data);
        throw new Error(
          data.error || data.message || "Error desconocido del backend"
        );
      }

      console.log("✅ Worker creado correctamente:", data);
      navigation.navigate("Home");
    } catch (error) {
      console.error("❌ Error creando worker:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = () => {
    createWorkerProfile();
  };

  return (
    <View
      style={[
        styles.onboarding__mainContainer,
        { paddingTop: insets.top + 40, paddingBottom: insets.bottom },
      ]}
    >
      {currentStep === 1 && (
        <Info
          workerData={workerData}
          setWorkerData={setWorkerData}
          onNext={handleNext}
        />
      )}
      {currentStep === 2 && (
        <Photo
          workerData={workerData}
          setWorkerData={setWorkerData}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {currentStep === 3 && (
        <Description
          workerData={workerData}
          setWorkerData={setWorkerData}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {currentStep === 4 && (
        <Services
          workerData={workerData}
          setWorkerData={setWorkerData}
          onBack={handleBack}
          onFinish={handleFinish}
          loading={loading}
        />
      )}
    </View>
  );
};

export default Onboarding;
