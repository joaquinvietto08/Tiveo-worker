import electricity from "../../assets/svgs/services/electricity";
import plumbing from "../../assets/svgs/services/plumbing";
import gas from "../../assets/svgs/services/gas";
import gardening from "../../assets/svgs/services/gardening";
import locksmith from "../../assets/svgs/services/locksmith";
import painting from "../../assets/svgs/services/painting";
import construction from "../../assets/svgs/services/construction";
import pool from "../../assets/svgs/services/pool";
import carpentry from "../../assets/svgs/services/carpentry";
import glass from "../../assets/svgs/services/glass";
import pets from "../../assets/svgs/services/pets";
import security from "../../assets/svgs/services/security";
import ironwork from "../../assets/svgs/services/ironwork";
import technology from "../../assets/svgs/services/technology";
import beauty from "../../assets/svgs/services/beauty";
import vehicles from "../../assets/svgs/services/vehicles";
import freight from "../../assets/svgs/services/freight";
import events from "../../assets/svgs/services/events";
import photography from "../../assets/svgs/services/photography";
import music from "../../assets/svgs/services/music";

export const getIcon = (serviceName) => {
  const iconMap = {
    electricity,
    plumbing,
    gas,
    gardening,
    locksmith,
    painting,
    construction,
    pool,
    carpentry,
    glass,
    pets,
    security,
    ironwork,
    technology,
    beauty,
    vehicles,
    freight,
    events,
    photography,
    music,
  };

  return iconMap[serviceName] || null;
};