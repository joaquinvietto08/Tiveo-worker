import React, { useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./OnboardingStyles";

import Info from "./steps/info/Info";
import Photo from "./steps/photo/Photo";
import Description from "./steps/description/Description";
import Services from "./steps/services/Services";

const Onboarding = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [currentStep, setCurrentStep] = useState(1);
  const [workerData, setWorkerData] = useState({
    name: "",
    lastName: "",
    workerName: "",
    photo: null,
    description: "",
    services: [],
  });

  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handleBack = () => setCurrentStep((prev) => prev - 1);

  const handleFinish = () => {
    console.log("Datos finales del trabajador:", workerData);
    navigation.replace("Home");
  };

  return (
    <View
      style={[
        styles.onboarding__mainContainer,
        { paddingTop: insets.top + 40, paddingBottom: insets.bottom + 40 },
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
        />
      )}
    </View>
  );
};

export default Onboarding;
