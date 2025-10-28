import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./RequestsStyles";
import { UserContext } from "../../../../../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import Available from "../../../../../../assets/svgs/worker/available.svg";
import Busy from "../../../../../../assets/svgs/worker/busy.svg";
import {
  formatDate,
  formatTime,
  translateService,
} from "../../../../../utils/formatHelpers";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { FIREBASE_APP } from "../../../../../config/firebaseConfig";
import { colors } from "../../../../../styles/globalStyles";
import { getIcon } from "../../../../../utils/getIcons";

const Requests = () => {
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState(null);
  const { requests, postulations, user } = useContext(UserContext);

  const visibleRequests = requests.filter((req) => {
    if (req.type === "direct") return true;
    // Todas mis postulaciones vinculadas a esta request
    const relatedPostulations = postulations.filter(
      (p) => p.requestId === req.id
    );
    // 🔹 No tengo ninguna postulación → mostrar
    if (relatedPostulations.length === 0) return true;
    // 🔹 Si alguna está rejected → ocultar
    const hasRejected = relatedPostulations.some(
      (p) => p.status === "rejected"
    );
    if (hasRejected) return false;
    // 🔹 En cualquier otro caso (por ejemplo pending o accepted) → mostrar
    return true;
  });

  const handleReject = async (item) => {
    try {
      const db = getFirestore(FIREBASE_APP);

      if (item.type === "open") {
        // request abierta → se guarda una postulación con status "rejected"
        await addDoc(collection(db, "postulations"), {
          requestId: item.id,
          worker: {
            uid: user.uid,
            firstName: user.firstName,
            lastName: user.lastName,
          },
          status: "rejected",
          createdAt: serverTimestamp(),
        });
        console.log("🟥 Postulación rechazada:", item.id);
      } else if (item.type === "direct") {
        // request directa → se actualiza su status a "rejected"
        const requestRef = doc(db, "requests", item.id);
        await updateDoc(requestRef, {
          status: "rejected",
        });
      }
    } catch (error) {}
  };

  const renderDateAndMoment = (moment, scheduledDateTime) => {
    if (moment === "now") {
      return (
        <View style={styles.requests__momentRow}>
          <Available
            height={22}
            width={22}
            fill={colors.primary}
            style={styles.advanceSearch__footer__detailIcon}
          />
          <Text style={styles.requests__momentNow}>Ahora mismo</Text>
        </View>
      );
    }

    const dateText = scheduledDateTime
      ? `${formatDate(scheduledDateTime)} ${formatTime(scheduledDateTime)} hs`
      : "Sin fecha";

    return (
      <View style={styles.requests__momentRow}>
        <Busy
          height={20}
          width={20}
          fill={colors.black}
          style={styles.advanceSearch__footer__detailIcon}
        />
        <Text style={styles.requests__momentScheduled}>{dateText}</Text>
      </View>
    );
  };

  const renderCard = (item) => {
    const hasDescription = item.description && item.description.trim() !== "";
    const services = item.services || [];
    const hasServices = services.length > 0;
    const hasImage = item.images && item.images.length > 0;

    // Diferenciar acción según el tipo de request
    const buttonLabel =
      item.type === "direct"
        ? "Aceptar trabajo"
        : item.type === "open"
        ? "Postularse"
        : null;

    if (!buttonLabel) return null;

    return (
      <View key={item.id} style={styles.requests__card}>
        <Text
          style={
            hasDescription
              ? styles.requests__title
              : [styles.requests__title, styles.requests__title__italic]
          }
        >
          {hasDescription ? item.description : "Sin descripción"}
        </Text>

        <Text style={styles.requests__client}>
          {item.user?.displayName || "Usuario desconocido"}
        </Text>

        <Text style={styles.requests__sectionLabel}>Dirección</Text>
        <View style={styles.requests__iconText}>
          <Ionicons name="location-sharp" size={18} color="#000" />
          <Text style={styles.requests__text}>
            {item.address?.address || "No disponible"}
            {item.address?.floor ? `, ${item.address.floor}` : ""}
          </Text>
        </View>

        <Text style={styles.requests__sectionLabel}>Fecha y hora</Text>
        {renderDateAndMoment(item.moment, item.scheduledDateTime)}

        {hasServices && (
          <View style={styles.requests__servicesContainer}>
            <Text style={styles.requests__sectionLabel}>Categorías</Text>
            <View style={styles.requests__chipsRow}>
              {services.map((srv, i) => {
                const ServiceIcon = getIcon(srv);
                return (
                  <View key={i} style={styles.requests__chip}>
                    <ServiceIcon width={16} height={16} />
                    <Text style={styles.requests__chipText}>
                      {translateService(srv)}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {hasImage && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.requests__imagesContainer}
          >
            {item.images.map((uri, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => setSelectedImage(uri)}
                activeOpacity={0.8}
              >
                <Image source={{ uri }} style={styles.requests__imageThumb} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        <View style={styles.requests__buttonsRow}>
          <TouchableOpacity
            style={styles.requests__buttonReject}
            onPress={() => handleReject(item)}
          >
            <Text style={styles.requests__buttonRejectText}>Rechazar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.requests__buttonAccept}
            onPress={() => navigation.navigate("JobApply", { job: item })}
          >
            <Text style={styles.requests__buttonAcceptText}>{buttonLabel}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <ScrollView
      style={styles.requests__scroll}
      contentContainerStyle={styles.requests__container}
      showsVerticalScrollIndicator={false}
    >
      {visibleRequests.map((item) => renderCard(item))}

      <Modal visible={!!selectedImage} transparent animationType="fade">
        <View style={styles.requests__modalOverlay}>
          <TouchableOpacity
            style={styles.requests__modalOverlay}
            onPress={() => setSelectedImage(null)}
            activeOpacity={1}
          >
            <Image
              source={{ uri: selectedImage }}
              style={styles.requests__modalImage}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Requests;
