import React, { useContext, useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import MapComponent from "../../components/map/map/Map";
import { Marker } from "react-native-maps";
import { styles } from "./CurrentWorkMapStyles";
import { colors } from "../../styles/globalStyles";
import { UserContext } from "../../context/UserContext";
import { LocationContext } from "../../context/LocationContext";
import PinMarkerIcon from "../../components/map/markers/pin/pinMarker.svg";
const BASE32 = "0123456789bcdefghjkmnpqrstuvwxyz";
const BITS = [16, 8, 4, 2, 1];

const FALLBACK_REGION = {
  latitude: -34.603684,
  longitude: -58.381559,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

const decodeGeohash = (hash) => {
  if (!hash || typeof hash !== "string") return null;
  let even = true;
  const lat = [-90.0, 90.0];
  const lng = [-180.0, 180.0];

  for (const char of hash.toLowerCase()) {
    const idx = BASE32.indexOf(char);
    if (idx === -1) return null;

    for (const mask of BITS) {
      if (even) {
        const mid = (lng[0] + lng[1]) / 2;
        if (idx & mask) lng[0] = mid;
        else lng[1] = mid;
      } else {
        const mid = (lat[0] + lat[1]) / 2;
        if (idx & mask) lat[0] = mid;
        else lat[1] = mid;
      }
      even = !even;
    }
  }

  const latitude = (lat[0] + lat[1]) / 2;
  const longitude = (lng[0] + lng[1]) / 2;

  if (
    Number.isFinite(latitude) &&
    Number.isFinite(longitude)
  ) {
    return { latitude, longitude };
  }
  return null;
};

const extractCoordinates = (source) => {
  if (!source) return null;
  if (
    typeof source.latitude === "number" &&
    typeof source.longitude === "number"
  ) {
    return { latitude: source.latitude, longitude: source.longitude };
  }

  if (typeof source.lat === "number" && typeof source.lng === "number") {
    return { latitude: source.lat, longitude: source.lng };
  }

  if (
    source.location &&
    typeof source.location.lat === "number" &&
    typeof source.location.lng === "number"
  ) {
    return {
      latitude: source.location.lat,
      longitude: source.location.lng,
    };
  }

  if (
    source.geometry &&
    source.geometry.location &&
    typeof source.geometry.location.lat === "number" &&
    typeof source.geometry.location.lng === "number"
  ) {
    return {
      latitude: source.geometry.location.lat,
      longitude: source.geometry.location.lng,
    };
  }

  if (typeof source.geohash === "string" && source.geohash.length) {
    const coords = decodeGeohash(source.geohash);
    if (coords) return coords;
  }

  if (
    source.geometry &&
    typeof source.geometry.geohash === "string" &&
    source.geometry.geohash.length
  ) {
    const coords = decodeGeohash(source.geometry.geohash);
    if (coords) return coords;
  }

  if (
    Array.isArray(source.coordinates) &&
    source.coordinates.length === 2 &&
    typeof source.coordinates[0] === "number" &&
    typeof source.coordinates[1] === "number"
  ) {
    return { latitude: source.coordinates[0], longitude: source.coordinates[1] };
  }

  return null;
};

const buildRegion = (clientCoords, workerCoords) => {
  const points = [clientCoords, workerCoords].filter(Boolean);
  if (!points.length) return FALLBACK_REGION;

  if (points.length === 1) {
    return {
      latitude: points[0].latitude,
      longitude: points[0].longitude,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    };
  }

  const lats = points.map((p) => p.latitude);
  const lngs = points.map((p) => p.longitude);

  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);

  const latitudeDelta = Math.max((maxLat - minLat) * 2, 0.02);
  const longitudeDelta = Math.max((maxLng - minLng) * 2, 0.02);

  return {
    latitude: (minLat + maxLat) / 2,
    longitude: (minLng + maxLng) / 2,
    latitudeDelta,
    longitudeDelta,
  };
};

const CurrentWorkMap = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const { activities } = useContext(UserContext);
  const { location: workerLocation } = useContext(LocationContext);

  const { activityId, activity: routeActivity } = route.params || {};

  const activity = useMemo(() => {
    if (!activityId && routeActivity) return routeActivity;
    return (
      activities?.find((item) => item.id === activityId) ||
      routeActivity ||
      null
    );
  }, [activities, activityId, routeActivity]);

  const clientCoords = useMemo(
    () => extractCoordinates(activity?.address),
    [activity]
  );

  const workerCoords = useMemo(
    () => extractCoordinates(workerLocation),
    [workerLocation]
  );

  const region = useMemo(
    () => buildRegion(clientCoords, workerCoords),
    [clientCoords, workerCoords]
  );

  const noLocations = !clientCoords && !workerCoords;

  return (
    <View style={styles.currentWorkMap__container}>
      <MapComponent
        style={styles.currentWorkMap__map}
        initialRegion={region}
        region={region}
        showsUserLocation={false}
        pointerEvents={noLocations ? "none" : "auto"}
      >
        {clientCoords ? (
          <Marker coordinate={clientCoords} tracksViewChanges={false}>
            <View style={styles.currentWorkMap__clientPin}>
              <PinMarkerIcon width={40} height={40} />
            </View>
          </Marker>
        ) : null}

        {workerCoords ? (
          <Marker coordinate={workerCoords} tracksViewChanges={false}>
            <View style={styles.currentWorkMap__workerDotOuter}>
              <View style={styles.currentWorkMap__workerDotInner} />
            </View>
          </Marker>
        ) : null}
      </MapComponent>

      <View
        style={[
          styles.currentWorkMap__header,
          { paddingTop: insets.top + 8 },
        ]}
      >
        <TouchableOpacity
          style={styles.currentWorkMap__backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <MaterialIcons name="arrow-back" size={22} color={colors.black} />
        </TouchableOpacity>
        <View>
          <Text style={styles.currentWorkMap__title}>Ubicaciones</Text>
          {activity?.address?.address ? (
            <Text
              style={{
                fontFamily: "Inter-Regular",
                fontSize: 13,
                color: colors.gray,
                marginTop: 2,
              }}
              numberOfLines={1}
            >
              {activity.address.address}
            </Text>
          ) : null}
        </View>
      </View>

      {noLocations && (
        <View style={styles.currentWorkMap__emptyState}>
          <MaterialIcons name="map" size={28} color={colors.gray} />
          <Text style={styles.currentWorkMap__emptyTitle}>
            No pudimos mostrar el mapa
          </Text>
          <Text style={styles.currentWorkMap__emptyText}>
            Necesitamos la dirección del cliente y tu ubicación actual para
            mostrar ambas posiciones.
          </Text>
        </View>
      )}
    </View>
  );
};

export default CurrentWorkMap;
