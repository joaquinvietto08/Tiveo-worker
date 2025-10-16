import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, Modal } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "./SchedulesStyles";
import { UserContext } from "../../../../../context/UserContext";

const Schedules = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { scheduled } = useContext(UserContext);

  const getServiceIcon = (service) => {
    switch (service) {
      case "electricity":
        return <Ionicons name="flash-outline" size={16} color="#000" />;
      case "plumbing":
        return <MaterialCommunityIcons name="pipe" size={16} color="#000" />;
      case "gas":
        return <MaterialCommunityIcons name="fire" size={16} color="#000" />;
      case "gardening":
        return <MaterialCommunityIcons name="leaf" size={16} color="#000" />;
      default:
        return <Ionicons name="construct-outline" size={16} color="#000" />;
    }
  };

  const renderCard = (item) => {
    const hasDescription = item.description && item.description.trim() !== "";
    const hasServices = item.services?.length > 0;

    return (
      <View key={item.id} style={styles.schedules__card}>
        {/* Descripción */}
        <Text
          style={
            hasDescription
              ? styles.schedules__title
              : [styles.schedules__title, styles.schedules__title__italic]
          }
        >
          {hasDescription ? item.description : "Sin descripción"}
        </Text>

        {/* Cliente */}
        <Text style={styles.schedules__client}>{item.user?.displayName || "Usuario desconocido"}</Text>

        {/* Dirección */}
        <Text style={styles.schedules__sectionLabel}>Dirección</Text>
        <View style={styles.schedules__iconText}>
          <Ionicons name="location-sharp" size={14} color="#000" />
          <Text style={styles.schedules__text}>
            {item.address?.address || "No disponible"}
            {item.address?.floor ? `, ${item.address.floor}` : ""}
          </Text>
        </View>

        {/* Fecha y hora */}
        <Text style={styles.schedules__sectionLabel}>Fecha y hora</Text>
        <View style={styles.schedules__momentRow}>
          {item.moment === "now" ? (
            <>
              <Ionicons name="walk-outline" size={16} color="#FFA500" />
              <Text style={styles.schedules__momentNow}>Ahora mismo</Text>
            </>
          ) : (
            <>
              <Ionicons name="time-outline" size={16} color="#000" />
              <Text style={styles.schedules__momentScheduled}>
                Martes 16 de junio 17:30 hs
              </Text>
            </>
          )}
        </View>

        {/* Categorías */}
        {hasServices && (
          <View style={styles.schedules__servicesContainer}>
            <Text style={styles.schedules__sectionLabel}>Categorías</Text>
            <View style={styles.schedules__chipsRow}>
              {item.services.map((srv, i) => (
                <View key={i} style={styles.schedules__chip}>
                  {getServiceIcon(srv)}
                  <Text style={styles.schedules__chipText}>
                    {srv.charAt(0).toUpperCase() + srv.slice(1)}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Botones */}
        <View style={styles.schedules__buttonsRow}>
          <TouchableOpacity style={styles.schedules__buttonDetails}>
            <Text style={styles.schedules__buttonDetailsText}>Ver detalles</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.schedules__buttonMessage}>
            <Text style={styles.schedules__buttonMessageText}>Mensajes</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <ScrollView
      style={styles.schedules__scroll}
      contentContainerStyle={styles.schedules__container}
      showsVerticalScrollIndicator={false}
    >
      {scheduled?.length > 0 ? (
        scheduled.map((item) => renderCard(item))
      ) : (
        <Text style={styles.schedules__emptyText}>No hay trabajos programados</Text>
      )}

      {/* Modal de preview imagen (por si lo necesitás más adelante) */}
      <Modal visible={!!selectedImage} transparent animationType="fade">
        <View style={styles.schedules__modalOverlay}>
          <TouchableOpacity
            style={styles.schedules__modalOverlay}
            onPress={() => setSelectedImage(null)}
            activeOpacity={1}
          >
            <Image source={{ uri: selectedImage }} style={styles.schedules__modalImage} />
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Schedules;
