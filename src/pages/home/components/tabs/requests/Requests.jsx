import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, Image, Modal, ScrollView } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "./RequestsStyles";
import { UserContext } from "../../../../../context/UserContext";

const Requests = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { requests } = useContext(UserContext); // solo requests, no activities

  const getServiceIcon = (service) => {
    switch (service) {
      case "electricity":
      case "electric":
        return <Ionicons name="flash-outline" size={16} color="#000" />;
      case "plumbing":
        return <MaterialCommunityIcons name="pipe" size={16} color="#000" />;
      case "gas":
        return <MaterialCommunityIcons name="fire" size={16} color="#000" />;
      case "pool":
        return <MaterialCommunityIcons name="pool" size={16} color="#000" />;
      default:
        return <Ionicons name="construct-outline" size={16} color="#000" />;
    }
  };

  const renderDateAndMoment = (moment, scheduledDateTime) => {
    if (moment === "now") {
      return (
        <View style={styles.requests__momentRow}>
          <Ionicons name="walk-outline" size={16} color="#FFA500" />
          <Text style={styles.requests__momentNow}>Ahora mismo</Text>
        </View>
      );
    }

    const dateText = scheduledDateTime
      ? new Date(scheduledDateTime).toLocaleDateString("es-AR", {
          weekday: "long",
          day: "numeric",
          month: "long",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "Sin fecha";

    return (
      <View style={styles.requests__momentRow}>
        <Ionicons name="time-outline" size={16} color="#000" />
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
          <Ionicons name="location-sharp" size={14} color="#000" />
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
              {services.map((srv, i) => (
                <View key={i} style={styles.requests__chip}>
                  {getServiceIcon(srv)}
                  <Text style={styles.requests__chipText}>
                    {srv.charAt(0).toUpperCase() + srv.slice(1)}
                  </Text>
                </View>
              ))}
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
          <TouchableOpacity style={styles.requests__buttonReject}>
            <Text style={styles.requests__buttonRejectText}>Rechazar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.requests__buttonAccept}>
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
      {requests.map((item) => renderCard(item))}

      <Modal visible={!!selectedImage} transparent animationType="fade">
        <View style={styles.requests__modalOverlay}>
          <TouchableOpacity
            style={styles.requests__modalOverlay}
            onPress={() => setSelectedImage(null)}
            activeOpacity={1}
          >
            <Image source={{ uri: selectedImage }} style={styles.requests__modalImage} />
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Requests;
