import { useEffect, useRef } from "react";
import * as Location from "expo-location";
import firestore from "@react-native-firebase/firestore";
import * as geofire from "geofire-common";

// Actualiza periódicamente la ubicación del worker en Firestore
// Escribe en workers/{uid}: { geohash, lat, lng, updatedAt }
export default function useWorkerLocationUpdates({ enabled, uid, intervalMs = 400000 }) {
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!enabled || !uid) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    let mounted = true;

    const ensurePermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") throw new Error("Permiso de ubicación denegado");
    };

    const tick = async () => {
      try {
        await ensurePermission();
        const position = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
          maximumAge: 10000,
          timeout: 5000,
        });
        if (!mounted) return;

        const { latitude, longitude } = position.coords;
        const geohash = geofire.geohashForLocation([latitude, longitude]);

        await firestore().collection("workers").doc(uid).update({
          geohash,
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });
      } catch (e) {
        // Silenciar errores para no romper el flujo
      }
    };

    tick();
    intervalRef.current = setInterval(tick, intervalMs);

    return () => {
      mounted = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [enabled, uid, intervalMs]);
}

