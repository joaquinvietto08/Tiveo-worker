import { View, Pressable } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { styles } from "./LocationMapStyle";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  userLocation,
  fetchAddressFromCoords,
} from "../../../actions/api/userLocation";
import * as geofire from "geofire-common";
import Feather from "@expo/vector-icons/Feather";
import Footer from "./features/footer/Footer";
import Map from "./features/map/Map";

const LocationMap = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const [addressComponents, setAddressComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shortAddress, setShortAddress] = useState("");
  const [pin, setPin] = useState(false);
  const { getLocation, selectedLocation } = route.params;
  const mapRef = useRef(null);

  useEffect(() => {
    setPin(true);
    if (addressComponents && addressComponents.address_components) {
      setLoading(false);
      const streetNumber = addressComponents.address_components[0]?.long_name;
      const streetName = addressComponents.address_components[1]?.short_name;

      if (streetName && streetNumber) {
        setShortAddress(streetName + " " + streetNumber);
      } else {
        setShortAddress(streetName);
      }
    } else {
      setLoading(true);
      setShortAddress("");
    }
  }, [addressComponents]);

  const buenosAiresRegion = {
    latitude: -34.603684,
    longitude: -58.381559,
    latitudeDelta: 0.006,
    longitudeDelta: 0.006,
  };

  useEffect(() => {
    const fetchLocationAndAddress = async () => {
      try {
        setLoading(true);

        if (selectedLocation) {
          const userRegion = {
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002,
          };
          setAddressComponents(selectedLocation);

          if (mapRef.current) {
            setTimeout(() => {
              mapRef.current.animateToRegion(userRegion, 1000);
            }, 500);
          }
        } else if (getLocation) {
          const location = await userLocation();
          const { latitude, longitude } = location.coords;
          const userRegion = {
            latitude,
            longitude,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002,
          };
          const fetchedAddress = await fetchAddressFromCoords(
            latitude,
            longitude
          );
          
          // Generar geohash si no existe
          if (fetchedAddress && fetchedAddress.geometry) {
            const geohash = geofire.geohashForLocation([latitude, longitude]);
            fetchedAddress.geometry = {
              ...fetchedAddress.geometry,
              geohash,
            };
          }
          
          setAddressComponents(fetchedAddress);

          if (mapRef.current) {
            mapRef.current.animateToRegion(userRegion, 1000);
          }
        } else {
          const fetchedAddress = await fetchAddressFromCoords(
            buenosAiresRegion.latitude,
            buenosAiresRegion.longitude
          );
          
          // Generar geohash si no existe
          if (fetchedAddress && fetchedAddress.geometry) {
            const geohash = geofire.geohashForLocation([
              buenosAiresRegion.latitude,
              buenosAiresRegion.longitude,
            ]);
            fetchedAddress.geometry = {
              ...fetchedAddress.geometry,
              geohash,
            };
          }
          
          setAddressComponents(fetchedAddress);
        }
      } catch (error) {
        navigation.navigate("LocationSelect", {
          errorMsg: "Algo salió mal, vuelve a intentarlo",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLocationAndAddress();
  }, [getLocation, selectedLocation]);

  const onRegionChangeComplete = async (location) => {
    const fetchedAddress = await fetchAddressFromCoords(
      location.latitude,
      location.longitude
    );

    // Generar geohash si no existe
    if (fetchedAddress && fetchedAddress.geometry) {
      const geohash = geofire.geohashForLocation([
        location.latitude,
        location.longitude,
      ]);
      fetchedAddress.geometry = {
        ...fetchedAddress.geometry,
        geohash,
      };
    }

    setAddressComponents(fetchedAddress);
  };

  return (
    <View style={styles.locationMap__mainContainer}>
      <GestureHandlerRootView>
        <View
          style={{
            ...styles.locationMap__headerContainer,
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          }}
        >
          <Pressable
            style={styles.locationMap__backButton}
            onPress={navigation.goBack}
          >
            <Feather name="arrow-left" size={24} color="black" />
          </Pressable>
        </View>
        <Map
          ref={mapRef}
          getLocation={getLocation}
          onRegionChangeComplete={onRegionChangeComplete}
          pin={pin}
        />
        <Footer
          address={shortAddress}
          loading={loading}
          addressComponents={addressComponents}
          navigation={navigation}
        />
      </GestureHandlerRootView>
    </View>
  );
};

export default LocationMap;
