import * as Location from "expo-location";
import Geocoder from "react-native-geocoding";

export const userLocation = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      throw new Error("Permiso de ubicación denegado");
    }
    // Intentar obtener la ubicación con precisión alta, máximo 10 segundos de caché, y con un timeout de 5 segundos
    let location = await Location.getCurrentPositionAsync({
      maximumAge: 1000, // Usar caché de hasta 1 segundo
      accuracy: Location.Accuracy.Highest,
      maximumAge: 10000, // Usar caché de hasta 10 segundos
      timeout: 5000, // Tiempo máximo de espera de 5 segundos
    });

    // Si obtenemos la ubicación, la devolvemos
    return location;
  } catch (error) {
    console.log("Error al obtener la ubicación:", error.message);
    throw error;
  }
};

export const fetchAddressFromCoords = async (latitude, longitude) => {
  try {
    // Inicializar Geocoder con la API key
    Geocoder.init("AIzaSyCcBYIbLnlMIzRijdTr01DXGCTNfPNKUc4", {
      language: "es",
    });

    // Realizar la solicitud de geocodificación
    const json = await Geocoder.from(latitude, longitude);

    const addressComponents = json.results.find((result) =>
      result.types.includes("street_address")
    );

    return addressComponents; // Devuelve todos los resultados, no solo address_components
  } catch (error) {
    console.warn("Error al obtener la dirección:", error);
    return;
  }
};
