export const translateService = (service) => {
  const serviceMap = {
    electricity: "Electricidad",
    plumbing: "Plomeria",
    gas: "Gas",
    gardening: "Jardineria",
    locksmith: "Cerrajeria",
    painting: "Pintura",
    construction: "Construccion",
    pool: "Pileta",
    carpentry: "Carpinteria",
    glass: "Vidrios",
    pets: "Mascotas",
    security: "Seguridad",
    ironwork: "Herreria",
    technology: "Tecnologia",
    beauty: "Belleza",
    vehicles: "Vehiculos",
    freight: "Fletes",
    events: "Eventos",
    photography: "Fotografia",
    music: "Musica",
  };

  return serviceMap[service] || service;
};

export const translateAvailabilityRequest = (availability) => {
  const availabilityRequestMap = {
    available: "Ahora mismo",
    busy: "A coordinar",
  };
  return availabilityRequestMap[availability] || availability;
};

export const translateAvailability = (availability) => {
  const availabilityMap = {
    available: "Disponible",
    busy: "Contactar",
  };
  return availabilityMap[availability] || availability;
};

export const formatPrice = (price) => {
  if (price === null) {
    return "Pago no registrado";
  }
  return `$ ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
};

export const formatDate = (dateTimeString) => {
  const date = new Date(dateTimeString);
  return date.toLocaleDateString("es-AR", { month: "long", day: "numeric" });
};

export const formatTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  return date.toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export const translateStatus = (status, moment) => {
  if (status === "confirm") {
    if (moment === "scheduled") {
      return "Programado";
    }
    if (moment === "now") {
      return "Confirmado";
    }
  }
  const statusMap = {
    pending: "Pendiente",
    going: "En camino",
    cancelled: "Cancelado",
    done: "Finalizado",
    "on-progress": "en progreso",
  };

  return statusMap[status] || status;
};

export const getTimeExperience = (joinedDateStr, mode = "number") => {
  const joined = new Date(joinedDateStr);
  const now = new Date();
  const years = now.getFullYear() - joined.getFullYear();
  const months = now.getMonth() - joined.getMonth();
  const totalMonths = years * 12 + months;

  if (mode === "number") {
    return totalMonths >= 12 ? Math.floor(totalMonths / 12) : totalMonths;
  }

  if (mode === "label") {
    return totalMonths >= 12
      ? "Años de experiencia en Tiveo"
      : "Meses de experiencia en Tiveo";
  }

  return "";
};
