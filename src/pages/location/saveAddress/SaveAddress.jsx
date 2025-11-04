import { View, Text, Pressable } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./SaveAddressStyle";
import Feather from "@expo/vector-icons/Feather";
import { LocationContext } from "../../../context/LocationContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Host } from "react-native-portalize";
import Form from "./features/form/Form";
import firestore from "@react-native-firebase/firestore";
import * as geofire from "geofire-common";
import { UserContext } from "../../../context/UserContext";

const SaveAddress = ({ navigation, route }) => {
  const { user } = useContext(UserContext);
  const insets = useSafeAreaInsets();
  const { addressComponents } = route.params;
  const { setLocation } = useContext(LocationContext);
  const [address, setAddress] = useState("");

  useEffect(() => {
    const streetName = addressComponents.address_components[1]?.long_name;
    const streetNumber = addressComponents.address_components[0]?.short_name;
    if (streetName && streetNumber) {
      setAddress(`${streetName} ${streetNumber}`);
    } else if (streetName) {
      setAddress(streetName);
    }

    const latitude = addressComponents.geometry.location.lat;
    const longitude = addressComponents.geometry.location.lng;
    const geohash = geofire.geohashForLocation([latitude, longitude]);

    addressComponents.geometry = {
      ...addressComponents.geometry,
      geohash,
    };
  }, [addressComponents]);

  const saveLocationContext = async (data) => {
    setLocation(data);
    
    // Si se usa "ubicación actual" sin guardar dirección, también actualizar el geohash del worker
    const geohash = data.geometry?.geohash;
    if (geohash && user?.uid) {
      try {
        const workerRef = firestore().collection("workers").doc(user.uid);
        const workerSnapshot = await workerRef.get();
        if (workerSnapshot.exists) {
          await workerRef.update({
            geohash: geohash,
          });
          console.log("Geohash actualizado permanentemente en el worker:", geohash);
        }
      } catch (error) {
        console.error("Error al actualizar el geohash del worker:", error);
      }
    }
  };

  const handleSaveAddress = async (formData) => {
    if (formData?.name) {
      const newAddressData = {
        name: formData.name,
        ...addressComponents,
      };

      try {
        const workerRef = firestore().collection("workers").doc(user.uid);
        saveLocationContext(newAddressData);
        const workerSnapshot = await workerRef.get();
        if (!workerSnapshot.exists) {
          console.log("El worker no existe en Firestore.");
          return;
        }

        // Guardar la dirección en la subcolección
        await workerRef.collection("addresses").add(newAddressData);
        
        // Actualizar el geohash del worker
        const geohash = addressComponents.geometry?.geohash;
        if (geohash) {
          await workerRef.update({
            geohash: geohash,
          });
          console.log("Geohash actualizado en el worker:", geohash);
        }

        console.log(
          "Dirección guardada en la subcolección addresses del worker."
        );
        navigation.goBack();
      } catch (error) {
        console.error("Error al guardar la dirección en Firestore:", error);
      }
    } else {
      console.log("El nombre de la ubicación es requerido");
    }
  };

  return (
    <View
      style={{
        ...styles.saveAddress__mainContainer,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Host>
          <View style={styles.saveAddress__headerContainer}>
            <Pressable
              style={styles.saveAddress__backButton}
              onPress={navigation.goBack}
            >
              <Feather name="arrow-left" size={24} color="black" />
            </Pressable>
          </View>
          <View style={styles.saveAddress__container}>
            <Text style={styles.saveAddress__title}>Nueva direccion</Text>
          </View>
          <View style={styles.saveAddress__formContainer}>
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontFamily: "Inter-SemiBold" }}>{address}</Text>
            </View>
            <Form onSubmit={handleSaveAddress} />
          </View>
          <View style={styles.saveAddress__bottomContainer}>
            <Pressable onPress={() => saveLocationContext(addressComponents)}>
              <Text style={styles.saveAddress__textLater}>Ahora no</Text>
            </Pressable>
          </View>
        </Host>
      </GestureHandlerRootView>
    </View>
  );
};

export default SaveAddress;
