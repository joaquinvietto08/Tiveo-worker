import React, { createContext, useState } from "react";

// Crear el contexto
export const LocationContext = createContext();

// Proveedor del contexto
export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null); // Estado inicial de la ubicación
  const [trackingCurrent, setTrackingCurrent] = useState(false); // Modo "Mi ubicación actual"

  return (
    <LocationContext.Provider value={{ location, setLocation, trackingCurrent, setTrackingCurrent }}>
      {children}
    </LocationContext.Provider>
  );
};
