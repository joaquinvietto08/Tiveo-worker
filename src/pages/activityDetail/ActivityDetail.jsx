import React, { useContext, useMemo, useState } from "react";
import {
  View,
  ScrollView,
  StatusBar,
  Modal,
  Text,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { FIREBASE_APP } from "../../config/firebaseConfig";
import { colors } from "../../styles/globalStyles";
import { styles } from "./ActivityDetailStyles";
import DetailHeader from "./components/DetailHeader";
import SummaryCard from "./components/SummaryCard";
import ServicesSection from "./components/ServicesSection";
import AddressSection from "./components/AddressSection";
import DescriptionSection from "./components/DescriptionSection";
import PaymentSection from "./components/PaymentSection";
import RatingSection from "./components/RatingSection";
import ActionButtons from "./components/ActionButtons";
import HelpButton from "./components/HelpButton";
import { UserContext } from "../../context/UserContext";

const ActivityDetail = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const { activities, setActivities } = useContext(UserContext);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  const { activityId, activity: routeActivity } = route.params || {};

  const activity = useMemo(() => {
    const byId = activities?.find((item) => item.id === activityId);
    if (byId) return byId;
    if (routeActivity) return routeActivity;
    return null;
  }, [activities, activityId, routeActivity]);

  const status = activity?.status;
  const paymentStatus = activity?.paymentStatus;
  const messagesDisabled = paymentStatus === "paid" || paymentStatus === "released";
  const cancelDisabled =
    !activity || status === "cancelled" || status === "done";
  const cancelLabel = cancelDisabled
    ? status === "cancelled"
      ? "Actividad cancelada"
      : status === "done"
      ? "Trabajo finalizado"
      : "Cancelar trabajo"
    : "Cancelar trabajo";

  const handleConfirmCancel = async () => {
    if (!activity?.id) return;

    setIsCancelling(true);
    try {
      const db = getFirestore(FIREBASE_APP);
      const activityRef = doc(db, "activities", activity.id);
      await updateDoc(activityRef, { status: "cancelled" });

      if (typeof setActivities === "function") {
        setActivities((prev) =>
          prev.map((item) =>
            item.id === activity.id
              ? {
                  ...item,
                  status: "cancelled",
                }
              : item
          )
        );
      }
    } catch (error) {
      console.error("Error cancelling activity", error);
    } finally {
      setIsCancelling(false);
      setShowCancelModal(false);
    }
  };

  return (
    <View
      style={[
        styles.activityDetail__container,
        { paddingTop: insets.top },
      ]}
    >
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />

      {activity ? (
        <ScrollView
          contentContainerStyle={[
            styles.activityDetail__scrollContent,
            { paddingBottom: 32 + insets.bottom },
          ]}
          showsVerticalScrollIndicator={false}
        >
          <DetailHeader title="Detalle del trabajo" />
          <SummaryCard activity={activity} />
          <ServicesSection services={activity.services} />
          <AddressSection address={activity.address} />
          <DescriptionSection description={activity.description || ""} />
          <PaymentSection activity={activity} />
          <RatingSection activity={activity} />
          <ActionButtons
            onPressMessages={() =>
              navigation.navigate("Messages", { activity })
            }
            messagesDisabled={messagesDisabled}
            onPressCancel={() => setShowCancelModal(true)}
            cancelDisabled={cancelDisabled}
            cancelLabel={cancelLabel}
            isCancelling={isCancelling}
          />
          <HelpButton onPress={() => navigation.navigate("Support", { activityId: activity.id })} />
        </ScrollView>
      ) : (
        <ScrollView
          contentContainerStyle={[
            styles.activityDetail__scrollContent,
            { paddingBottom: 32 + insets.bottom, flexGrow: 1 },
          ]}
          showsVerticalScrollIndicator={false}
        >
          <DetailHeader title="Detalle del trabajo" />
          <View style={styles.activityDetail__emptyState}>
            <Text style={styles.activityDetail__emptyTitle}>
              Actividad no disponible
            </Text>
            <Text style={styles.activityDetail__emptyMessage}>
              No encontramos información de esta actividad. Probá volver al
              listado y abrirla nuevamente.
            </Text>
          </View>
          <HelpButton onPress={() => navigation.navigate("Support")} />
        </ScrollView>
      )}

      <Modal
        transparent
        visible={showCancelModal}
        animationType="fade"
        onRequestClose={() => setShowCancelModal(false)}
      >
        <View style={styles.activityDetail__modalOverlay}>
          <View style={styles.activityDetail__modalCard}>
            <Text style={styles.activityDetail__modalTitle}>
              ¿Cancelar este trabajo?
            </Text>
            <Text style={styles.activityDetail__modalMessage}>
              La actividad aparecerá como cancelada y el cliente será notificado.
            </Text>

            <View style={styles.activityDetail__modalActions}>
              <TouchableOpacity
                style={styles.activityDetail__modalCancel}
                activeOpacity={0.8}
                onPress={() => setShowCancelModal(false)}
              >
                <Text style={styles.activityDetail__modalCancelText}>
                  Volver
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.activityDetail__modalConfirm}
                activeOpacity={0.8}
                onPress={handleConfirmCancel}
                disabled={isCancelling}
              >
                <Text style={styles.activityDetail__modalConfirmText}>
                  Confirmar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ActivityDetail;
