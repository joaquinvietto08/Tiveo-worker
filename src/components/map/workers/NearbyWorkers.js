import React, { useContext, useEffect, useState } from "react";
import { LocationContext } from "../../../context/LocationContext";
import * as geofire from "geofire-common";
import { workers } from "../../data/workersData";

export const NearbyWorkers = (radiusInKm = 1, intervalMs = 25000) => {
  const { location } = useContext(LocationContext);
  const [workersInSiteLocation, setWorkersInSiteLocation] = useState([]);
  const [workersInGeneralLocation, setWorkersInGeneralLocation] = useState([]);

  useEffect(() => {
    if (!location) return;

    const fetchNearbyWorkers = () => {
      const radiusInM = radiusInKm * 1000;
      const nearbyWorkersInSite = [];
      const nearbyWorkersInGeneral = [];

      // Calcular los límites de geohash para el área de búsqueda
      const bounds = geofire.geohashQueryBounds(
        [location.geometry.location.lat, location.geometry.location.lng],
        radiusInM
      );

      workers.forEach((worker) => {
        const {
          lat: workerLat,
          lng: workerLng,
          geohash: workerGeohash,
          services,
        } = worker;

        // Verificar si el trabajador está en el área de búsqueda
        const isInBounds = bounds.some(
          ([start, end]) => workerGeohash >= start && workerGeohash <= end
        );

        if (!isInBounds) return; // Saltar a la siguiente iteración si el trabajador no está en el área de búsqueda

        // Verificar si el trabajador está en una ubicación de servicio o en su ubicación general
        let isAtServiceLocation = false;
        services.forEach((service) => {
          if (
            (service.serviceType === "onsite" ||
              service.serviceType === "flexible") &&
            service.geohash === workerGeohash
          ) {
            isAtServiceLocation = true;
          }
        });

        // Clasificar al trabajador según su ubicación
        if (isAtServiceLocation) {
          nearbyWorkersInSite.push(worker);
        } else {
          nearbyWorkersInGeneral.push(worker);
        }
      });

      setWorkersInSiteLocation(nearbyWorkersInSite);
      setWorkersInGeneralLocation(nearbyWorkersInGeneral);
    };

    // Llamar a la función inicialmente
    fetchNearbyWorkers();

    // Establecer un intervalo para actualizar cada 25 segundos
    const interval = setInterval(fetchNearbyWorkers, intervalMs);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, [location, radiusInKm, intervalMs]);

  return { workersInSiteLocation, workersInGeneralLocation };
};
