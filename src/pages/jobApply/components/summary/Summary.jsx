import { View, Text } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "./SummaryStyles";
import { formatDate, formatTime } from "../../../../utils/formatHelpers";

const Summary = ({job}) => {
  const hasDescription = job.description && job.description.trim() !== "";
  const services = job.services || [];
  const hasServices = services.length > 0;

  const getServiceIcon = (service) => {
    switch (service) {
      case "electricity":
        return <Ionicons name="flash-outline" size={16} color="#000" />;
      case "plumbing":
        return <MaterialCommunityIcons name="pipe" size={16} color="#000" />;
      case "gas":
        return <MaterialCommunityIcons name="fire" size={16} color="#000" />;
      case "gardening":
        return <MaterialCommunityIcons name="leaf" size={16} color="#000" />;
      default:
        return <Ionicons name="construct-outline" size={16} color="#000" />;
    }
  };

  const renderMoment = () => {
    if (job.moment === "now") {
      return (
        <View style={styles.jobApply__summary__momentRow}>
          <Ionicons name="walk-outline" size={18} color="#FFA500" />
          <Text style={styles.jobApply__summary__momentNow}>Ahora mismo</Text>
        </View>
      );
    }

    const dateText = job.scheduledDateTime
      ? `${formatDate(job.scheduledDateTime)} • ${formatTime(
          job.scheduledDateTime
        )}`
      : "Fecha no disponible";

    console.log(job.scheduledDateTime);

    return (
      <View style={styles.jobApply__summary__momentRow}>
        <Ionicons name="time-outline" size={18} color="#000" />
        <Text style={styles.jobApply__summary__momentScheduled}>
          {dateText}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.jobApply__summary__card}>
      <Text
        style={
          hasDescription
            ? styles.jobApply__summary__description
            : [
                styles.jobApply__summary__description,
                styles.jobApply__summary__description__italic,
              ]
        }
      >
        {hasDescription ? job.description : "Sin descripción"}
      </Text>

      <Text style={styles.jobApply__summary__client}>
        {job.client?.displayName}
      </Text>

      <View style={styles.jobApply__summary__iconText}>
        <Ionicons name="location-sharp" size={16} color="#000" />
        <Text style={styles.jobApply__summary__address}>
          {job.address?.address}
          {job.address?.floor ? `, ${job.address.floor}` : ""}
        </Text>
      </View>

      {renderMoment()}

      {hasServices && (
        <View style={styles.jobApply__summary__chipsRow}>
          {services.map((srv, i) => (
            <View key={i} style={styles.jobApply__summary__chip}>
              {getServiceIcon(srv)}
              <Text style={styles.jobApply__summary__chipText}>
                {srv.charAt(0).toUpperCase() + srv.slice(1)}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default Summary;
