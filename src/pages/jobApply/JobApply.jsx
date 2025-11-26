import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Modal,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./JobApplyStyles";
import { colors } from "../../styles/globalStyles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Summary from "./components/summary/Summary";
import Body from "./components/body/Body";
import Schedule from "./components/schedule/Schedule";
import { usePostulationValues } from "./utils/postulationValues";
import { FIREBASE_APP } from "../../config/firebaseConfig";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

const JobApply = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const { job } = route.params;
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  const [date, setDate] = useState(new Date());
  const [offerAnotherTime, setOfferAnotherTime] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const postulationData = usePostulationValues(
    job,
    budget,
    message, 
    date,
    offerAnotherTime
  );

  const handleSubmit = async () => {
    if (job.type !== "direct" && !postulationData) {
      Alert.alert(
        "Perfil no disponible",
        "No pudimos cargar tus datos de trabajador. Reintenta en unos segundos."
      );
      return;
    }

    try {
      const db = getFirestore(FIREBASE_APP);
      setIsSubmitting(true);

      if (job.type === "direct") {
        // 🔹 Trabajo directo: crear activity a partir de la request mediante endpoint
        const response = await fetch(
          "https://createactivityfromrequest-fpeb5gaoea-uc.a.run.app",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              requestId: job.id,
              newStatus: "confirm",
            }),
          }
        );

        if (!response.ok) {
          const text = await response.text();
          throw new Error(`Error HTTP ${response.status}: ${text}`);
        }

        const data = await response.json().catch(() => ({}));
        console.log("✅ Trabajo directo confirmado", data);
      } else {
        // 🔹 Postulación normal: agregamos nuevo documento
        await addDoc(collection(db, "postulations"), {
          ...postulationData,
          createdAt: serverTimestamp(),
        });
        console.log("✅ Postulación enviada correctamente");
      }

      navigation.goBack();
    } catch (error) {
      console.error("❌ Error al enviar postulación:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View
      style={{
        ...styles.jobApply__container,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <StatusBar backgroundColor={colors.background} translucent={false} />

      <KeyboardAwareScrollView
        style={styles.jobApply__scroll}
        contentContainerStyle={styles.jobApply__scrollContent}
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
        extraScrollHeight={120}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.jobApply__title}>
          {job.type === "direct"
            ? "Confirmar trabajo"
            : "Postularme al trabajo"}
        </Text>

        {/* --- Resumen del trabajo --- */}
        <Summary job={job} />

        {/* --- Solo se muestran estos si NO es directo --- */}
        {job.type !== "direct" && (
          <>
            <Body
              budget={budget}
              message={message}
              setBudget={setBudget}
              setMessage={setMessage}
            />
            <Schedule
              date={date}
              setDate={setDate}
              offerAnotherTime={offerAnotherTime}
              setOfferAnotherTime={setOfferAnotherTime}
            />
          </>
        )}

        {/* --- Botones --- */}
        <View style={styles.jobApply__buttonsRow}>
          <TouchableOpacity
            style={styles.jobApply__buttonSubmit}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            <Text style={styles.jobApply__buttonSubmitText}>
              {job.type === "direct"
                ? "Confirmar trabajo"
                : "Enviar postulación"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.jobApply__buttonCancel}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.jobApply__buttonCancelText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>

      {/* --- Modal de carga --- */}
      <Modal
        visible={isSubmitting}
        transparent
        animationType="fade"
        statusBarTranslucent
      >
        <View style={styles.jobApply__loadingModal__overlay}>
          <View style={styles.jobApply__loadingModal__container}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.jobApply__loadingModal__text}>
              {job.type === "direct"
                ? "Confirmando trabajo..."
                : "Enviando postulación..."}
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default JobApply;
