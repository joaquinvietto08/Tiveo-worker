import React, { useContext, useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./OnboardingStyles";
import Info from "./steps/info/Info";
import Photo from "./steps/photo/Photo";
import Description from "./steps/description/Description";
import Services from "./steps/services/Services";
import { UserContext } from "../../context/UserContext";
import * as FileSystem from "expo-file-system";
import {
  getStorage,
  ref as storageRef,
  putFile,
  getDownloadURL,
} from "@react-native-firebase/storage";
import {
  doc,
  getFirestore,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { FIREBASE_APP } from "../../config/firebaseConfig";
import { TouchableOpacity } from "react-native";

const Onboarding = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { user } = useContext(UserContext);
  const params = route?.params ?? {};
  const { initialWorkerData, redirectTo } = params;
  const mode = params.mode === "edit" ? "edit" : "create";
  const isEditMode = mode === "edit";
  const storage = useMemo(() => getStorage(), []);
  const db = useMemo(() => getFirestore(FIREBASE_APP), []);

  const [currentStep, setCurrentStep] = useState(1);

  const emptyWorkerData = useMemo(
    () => ({
      name: "",
      lastName: "",
      workerName: "",
      phone: "",
      birthDate: "",
      photo: null,
      description: "",
      services: [],
    }),
    []
  );

  const mergedInitialData = useMemo(() => {
    if (!isEditMode) {
      return { ...emptyWorkerData };
    }
    const source = initialWorkerData || user || {};
    return {
      ...emptyWorkerData,
      name: source.name || "",
      lastName: source.lastName || "",
      workerName: source.workerName || "",
      phone: source.phone || "",
      birthDate: source.birthDate || "",
      photo: source.photo || null,
      description: source.description || "",
      services: Array.isArray(source.services) ? source.services : [],
    };
  }, [emptyWorkerData, initialWorkerData, isEditMode, user]);

  const [workerData, setWorkerData] = useState(mergedInitialData);

  useEffect(() => {
    setWorkerData(mergedInitialData);
    setCurrentStep(1);
  }, [mergedInitialData]);

  const [loading, setLoading] = useState(false);

  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handleBack = () => {
    if (!loading) setCurrentStep((prev) => prev - 1);
  };

  const navigateAfterSubmit = () => {
    if (redirectTo === "goBack") {
      navigation.goBack();
      return;
    }
    if (redirectTo) {
      navigation.navigate(redirectTo);
      return;
    }

    if (isEditMode) {
      navigation.goBack();
    } else {
      navigation.navigate("Home");
    }
  };

  const preparePhotoPayload = async () => {
    let photoToSend = workerData.photo;
    if (photoToSend?.startsWith?.("file://")) {
      photoToSend = await FileSystem.readAsStringAsync(photoToSend, {
        encoding: FileSystem.EncodingType.Base64,
      });
    }
    return photoToSend;
  };

  const createWorkerProfile = async () => {
    try {
      if (!user?.uid) {
        throw new Error("Usuario no autenticado");
      }
      setLoading(true);

      const photoToSend = await preparePhotoPayload();

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
      navigateAfterSubmit();
    } catch (error) {
      console.error("❌ Error creando worker:", error);
    } finally {
      setLoading(false);
    }
  };

  const uploadProfilePhotoIfNeeded = async (uid) => {
    const nextPhoto = workerData.photo;

    if (nextPhoto === undefined) {
      return undefined;
    }

    if (!nextPhoto) {
      return null;
    }

    if (user?.photo && nextPhoto === user.photo) {
      return user.photo;
    }

    if (typeof nextPhoto === "string" && nextPhoto.startsWith("http")) {
      return nextPhoto;
    }

    if (typeof nextPhoto === "string" && nextPhoto.startsWith("file://")) {
      try {
        const profileRef = storageRef(storage, `workers/${uid}/profile.jpg`);
        await putFile(profileRef, nextPhoto);
        const url = await getDownloadURL(profileRef);
        return url;
      } catch (uploadError) {
        console.error("❌ Error subiendo la foto del worker:", uploadError);
        throw uploadError;
      }
    }

    return nextPhoto;
  };

  const updateWorkerProfile = async () => {
    try {
      if (!user?.uid) {
        throw new Error("Usuario no autenticado");
      }
      setLoading(true);

      const uid = user.uid;
      const workerRef = doc(db, "workers", uid);
      const photoUrl = await uploadProfilePhotoIfNeeded(uid);

      const payload = {
        name: workerData.name || "",
        lastName: workerData.lastName || "",
        workerName: workerData.workerName || "",
        phone: workerData.phone || "",
        birthDate: workerData.birthDate || "",
        description: workerData.description || "",
        services: Array.isArray(workerData.services) ? workerData.services : [],
        updatedAt: serverTimestamp(),
      };

      if (workerData.banner !== undefined) {
        payload.banner = workerData.banner || null;
      }

      if (photoUrl !== undefined) {
        payload.photo = photoUrl;
      }

      await updateDoc(workerRef, payload);

      console.log("✅ Worker actualizado correctamente (Firestore)");
      navigateAfterSubmit();
    } catch (error) {
      console.error("❌ Error actualizando worker:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = () => {
    if (isEditMode) {
      updateWorkerProfile();
    } else {
      createWorkerProfile();
    }
  };

  return (
    <View
      style={[
        styles.onboarding__mainContainer,
        { paddingTop: insets.top + 40, paddingBottom: insets.bottom },
      ]}
    >
      {mode === "edit" && (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
          style={styles.onboarding__cancelBtn}
        >
          <Text style={styles.onboarding__cancelBtnText}>Cancelar</Text>
        </TouchableOpacity>
      )}
      {currentStep === 1 && (
        <Info
          workerData={workerData}
          setWorkerData={setWorkerData}
          onNext={handleNext}
          mode={mode}
        />
      )}
      {currentStep === 2 && (
        <Photo
          workerData={workerData}
          setWorkerData={setWorkerData}
          onNext={handleNext}
          onBack={handleBack}
          mode={mode}
        />
      )}
      {currentStep === 3 && (
        <Description
          workerData={workerData}
          setWorkerData={setWorkerData}
          onNext={handleNext}
          onBack={handleBack}
          mode={mode}
        />
      )}
      {currentStep === 4 && (
        <Services
          workerData={workerData}
          setWorkerData={setWorkerData}
          onBack={handleBack}
          onFinish={handleFinish}
          loading={loading}
          mode={mode}
        />
      )}
    </View>
  );
};

export default Onboarding;
