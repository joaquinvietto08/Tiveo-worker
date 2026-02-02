import React, { useEffect, useState, useContext } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { styles } from "./OptionListStyles";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
  updateDoc,
  serverTimestamp,
} from "@react-native-firebase/firestore";
import { LocationContext } from "../../../../../context/LocationContext";
import { UserContext } from "../../../../../context/UserContext";
import { colors } from "../../../../../styles/globalStyles";
import {
  userLocation,
  fetchAddressFromCoords,
} from "../../../../../actions/api/userLocation";
import * as geofire from "geofire-common";

const DefaultItem = ({ item, navigation, onUseCurrentLocation }) => {
  let iconName;

  if (item.key === "1") {
    iconName = "location-crosshairs";
  } else if (item.key === "2") {
    iconName = "map-pin";
  }

  const handlePress = () => {
    if (item.key === "1") {
      onUseCurrentLocation?.();
    } else if (item.key === "2") {
      navigation.navigate("LocationMap", { getLocation: false });
    }
  };

  return (
    <Pressable
      style={styles.locationSelect__optionList__defaultContainer}
      onPress={handlePress}
    >
      <View style={styles.locationSelect__optionList__iconContainer}>
        <FontAwesome6
          name={iconName}
          size={18}
          color={iconName === "location-crosshairs" ? colors.blue : colors.primary}
        />
      </View>
      <View style={styles.locationSelect__optionList__subContainer}>
        <Text style={styles.locationSelect__optionList__optionName}>
          {item.name}
        </Text>
      </View>
    </Pressable>
  );
};

const LocationItem = ({ item, onSelect }) => {
  const iconName = item.name ? "house" : "location-dot";

  return (
    <Pressable
      style={styles.locationSelect__optionList__addressContainer}
      onPress={() => onSelect(item)}
    >
      <View style={styles.locationSelect__optionList__iconContainer}>
        <FontAwesome6 name={iconName} size={18} color="black" />
      </View>
      <View style={styles.locationSelect__optionList__subContainer}>
        <Text style={styles.locationSelect__optionList__addressName}>
          {item.name ||
            item.address_components[1]?.long_name +
              " " +
              item.address_components[0]?.short_name}
        </Text>
        {item.name && (
          <Text style={styles.locationSelect__optionList__addressDetails}>
            {item.address_components[1]?.long_name +
              " " +
              item.address_components[0]?.short_name}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

const OptionList = ({ navigation, setShowLoading }) => {
  const [locations, setLocations] = useState([]);
  const { setLocation, setTrackingCurrent } = useContext(LocationContext);
  const { user } = useContext(UserContext);
  const db = getFirestore();

  const defaultOptions = [
    { key: "1", name: "Usar ubicacion real" },
    { key: "2", name: "Seleccionar en el mapa" },
  ];

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const workerRef = doc(db, "workers", user.uid);
        const workerSnapshot = await getDoc(workerRef);

        if (!workerSnapshot.exists) {
          console.log("El worker no existe en Firestore.");
          return;
        }
        const addressesSnapshot = await getDocs(collection(workerRef, "addresses"));

        const addressesList = addressesSnapshot.docs.map((doc) => ({
          key: doc.id,
          ...doc.data(),
        }));

        setLocations(addressesList);
      } catch (error) {
        console.error("Error al obtener direcciones de Firestore:", error);
      } finally {
        setTimeout(() => {
          setShowLoading(false);
        }, 1500);
      }
    };

    fetchAddresses();
  }, []);

  const handleSelectLocation = async (item) => {
    const { key, ...locationData } = item;
    setLocation(locationData);
    // Selección manual/mapa: desactivar seguimiento de ubicación actual
    setTrackingCurrent(false);
    
    // Actualizar el geohash, lat y lng del worker en Firestore
    const geohash = locationData.geometry?.geohash;
    const latitude = locationData.geometry?.location?.lat;
    const longitude = locationData.geometry?.location?.lng;
    
    if (geohash && user?.uid) {
      try {
        const updateData = { geohash, updatedAt: serverTimestamp() };
        if (latitude !== undefined) updateData.lat = latitude;
        if (longitude !== undefined) updateData.lng = longitude;
        
        await updateDoc(doc(db, "workers", user.uid), updateData);
        console.log("Ubicación actualizada en el worker al seleccionar ubicación guardada:", { geohash, lat: latitude, lng: longitude });
      } catch (error) {
        console.error("Error al actualizar la ubicación del worker:", error);
      }
    }
  };

  const handleUseCurrentLocation = async () => {
    try {
      setShowLoading?.(true);
      const loc = await userLocation();
      const { latitude, longitude } = loc.coords;

      const fetchedAddress = await fetchAddressFromCoords(latitude, longitude);
      const geohash = geofire.geohashForLocation([latitude, longitude]);

      const locationData = fetchedAddress || {};
      locationData.geometry = {
        ...(locationData.geometry || {}),
        location: { lat: latitude, lng: longitude },
        geohash,
      };

      setLocation(locationData);
      setTrackingCurrent(true);

      await updateDoc(doc(db, "workers", user.uid), {
        geohash,
        lat: latitude,
        lng: longitude,
        updatedAt: serverTimestamp(),
      });
    } catch (e) {
      console.warn("No se pudo usar la ubicación actual:", e?.message || e);
    } finally {
      setShowLoading?.(false);
    }
  };

  const renderItem = ({ item }) => {
    if (item.key === "1" || item.key === "2") {
      return (
        <DefaultItem
          item={item}
          navigation={navigation}
          onUseCurrentLocation={handleUseCurrentLocation}
        />
      );
    } else {
      return <LocationItem item={item} onSelect={handleSelectLocation} />;
    }
  };

  return (
    <View style={styles.locationSelect__optionList__container}>
      <FlatList
        data={[...defaultOptions, ...locations]}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default OptionList;
