import React, { useContext, useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Modal,
  ActivityIndicator,
} from "react-native";
import { styles } from "./CurrentWorkStyles";
import Header from "./components/header/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { UserContext } from "../../context/UserContext";
import Body from "./components/body/Body";
import Status from "./components/status/Status";
import Buttons from "./components/buttons/Buttons";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { FIREBASE_APP } from "../../config/firebaseConfig";
import { colors } from "../../styles/globalStyles";
import { useNavigation } from "@react-navigation/native";

const CurrentWork = ({ route }) => {
  const insets = useSafeAreaInsets();
  const { activityId } = route.params;
  const { activities, setActivities } = useContext(UserContext);
  const activity = activities?.find((a) => a.id === activityId) || {};
  const isWarranty = activity?.warranty === "claimed";
  const navigation = useNavigation();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCancelActivity = async () => {
    setLoading(true);
    try {
      const db = getFirestore(FIREBASE_APP);
      const activityRef = doc(db, "activities", activity.id);
      await updateDoc(activityRef, { status: "cancelled" });

      const updatedActivities = activities.map((a) =>
        a.id === activity.id ? { ...a, status: "cancelled" } : a
      );
      setActivities(updatedActivities);
      setShowCancelModal(false);
      console.log("🚫 Trabajo cancelado correctamente");
    } catch (error) {
      console.error("❌ Error al cancelar el trabajo:", error);
    } finally {
      navigation.goBack();
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        ...styles.currentWork__container,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <ScrollView
        style={styles.currentWork__scrollView}
        contentContainerStyle={styles.currentWork__scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <Header status={activity.status} isWarranty={isWarranty} />
        {isWarranty ? (
          <View style={styles.currentWork__warrantyBanner}>
            <Text style={styles.currentWork__warrantyBannerText}>
              Reclamo de garantía
            </Text>
          </View>
        ) : (
          <Status status={activity.status} />
        )}
        <Buttons activity={activity} isWarranty={isWarranty} />
        <Body activity={activity} />

        {/* Botón Cancelar (solo si no es garantía) */}
        {!isWarranty && (
          <TouchableOpacity
            onPress={() => setShowCancelModal(true)}
            activeOpacity={0.7}
            style={styles.currentWork__cancelBtn}
          >
            <Text style={styles.currentWork__cancelText}>Cancelar trabajo</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* Modal de confirmación */}
      <Modal
        visible={showCancelModal}
        transparent
        statusBarTranslucent={true}
        animationType="fade"
        onRequestClose={() => setShowCancelModal(false)}
      >
        <View style={styles.currentWork__modal__overlay}>
          <View style={styles.currentWork__modal__content}>
            <Text style={styles.currentWork__modal__title}>
              ¿Seguro que querés cancelar este trabajo?
            </Text>

            <View style={styles.currentWork__modal__actions}>
              {/* Texto rojo "Sí, cancelar" */}
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleCancelActivity}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color={colors.red} />
                ) : (
                  <Text style={styles.currentWork__modal__confirmText}>
                    Cancelar trabajo
                  </Text>
                )}
              </TouchableOpacity>

              {/* Botón negro "Cancelar" */}
              <TouchableOpacity
                style={styles.currentWork__modal__cancelBtn}
                activeOpacity={0.8}
                onPress={() => setShowCancelModal(false)}
              >
                <Text style={styles.currentWork__modal__cancelBtnText}>
                  Volver atras
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CurrentWork;
