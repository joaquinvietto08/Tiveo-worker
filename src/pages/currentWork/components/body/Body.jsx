import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  Linking,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./BodyStyles";
import {
  formatDate,
  formatTime,
  translateService,
} from "../../../../utils/formatHelpers";
import { getIcon } from "../../../../utils/getIcons";
import { useNavigation } from "@react-navigation/native";

const Body = ({ activity }) => {
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState(null);
  const {
    description,
    client,
    address,
    scheduledDateTime,
    services = [],
    images = [],
  } = activity;

  const hasImages = Array.isArray(images) && images.length > 0;
  const phoneNumber = (address?.phone || "").trim();
  const hasPhone = Boolean(phoneNumber);

  const handleOpenMap = () => {
    console.log(activity)
    navigation.navigate("CurrentWorkMap", {
      activityId: activity?.id,
      activity,
    });
  };

  // 🕒 Formatear fecha y hora si existen
  const formattedDateTime = scheduledDateTime
    ? `${formatDate(scheduledDateTime)} • ${formatTime(scheduledDateTime)} hs`
    : "Sin fecha programada";

  return (
    <View style={styles.currentWork__body__container}>
      <Text style={styles.currentWork__body__title}>
        {description || "Trabajo sin descripción"}
      </Text>

      {/* Información del cliente */}
      <View style={styles.currentWork__body__clientRow}>
        <View>
          <Text style={styles.currentWork__body__clientName}>
            {client?.displayName || "Cliente desconocido"}
          </Text>
          <Text style={styles.currentWork__body__clientLabel}>Cliente</Text>
        </View>

        <TouchableOpacity
          style={[
            styles.currentWork__body__callButton,
            !hasPhone && styles.currentWork__body__callButtonDisabled,
          ]}
          activeOpacity={hasPhone ? 0.8 : 1}
          disabled={!hasPhone}
          onPress={() => {
            if (!hasPhone) return;
            Linking.openURL(`tel:${phoneNumber}`);
          }}
        >
          <MaterialIcons name="call" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Dirección */}
      {address?.address && (
        <View style={styles.currentWork__body__section}>
          <Text style={styles.currentWork__body__sectionTitle}>Dirección</Text>
          <View style={styles.currentWork__body__sectionBox}>
            <MaterialIcons name="location-on" size={18} color="#555" />
            <Text style={styles.currentWork__body__sectionText}>
              {address.address}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.currentWork__body__mapButton}
            activeOpacity={0.85}
            onPress={handleOpenMap}
          >
            <MaterialIcons name="map" size={18} color="#fff" />
            <Text style={styles.currentWork__body__mapButtonText}>
              Ver mapa
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Fecha y hora */}
      {scheduledDateTime && (
        <View style={styles.currentWork__body__section}>
          <Text style={styles.currentWork__body__sectionTitle}>
            Fecha y hora programada
          </Text>
          <View style={styles.currentWork__body__sectionBox}>
            <MaterialIcons name="event" size={18} color="#555" />
            <Text style={styles.currentWork__body__sectionText}>
              {formattedDateTime.charAt(0).toUpperCase() +
                formattedDateTime.slice(1)}
            </Text>
          </View>
        </View>
      )}

      {/* Servicios */}
      {services.length > 0 && (
        <View style={styles.currentWork__body__section}>
          <Text style={styles.currentWork__body__sectionTitle}>Servicios</Text>
          <View style={styles.currentWork__body__servicesRow}>
            {services.map((srv, index) => {
              const ServiceIcon = getIcon(srv);
              return (
                <View key={index} style={styles.currentWork__body__serviceTag}>
                  <ServiceIcon width={16} height={16} />
                  <Text style={styles.currentWork__body__serviceText}>
                    {translateService(srv)}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      )}

      {/* Imágenes del cliente */}
      {hasImages && (
        <View style={styles.currentWork__body__section}>
          <Text style={styles.currentWork__body__sectionTitle}>
            Imágenes del cliente
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.currentWork__body__imagesContainer}
          >
            {images.map((uri, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => setSelectedImage(uri)}
                activeOpacity={0.8}
              >
                <Image
                  source={{ uri }}
                  style={styles.currentWork__body__imageThumb}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      <Modal visible={!!selectedImage} transparent animationType="fade">
        <View style={styles.currentWork__body__modalOverlay}>
          <TouchableOpacity
            style={styles.currentWork__body__modalOverlay}
            onPress={() => setSelectedImage(null)}
            activeOpacity={1}
          >
            <Image
              source={{ uri: selectedImage }}
              style={styles.currentWork__body__modalImage}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default Body;
