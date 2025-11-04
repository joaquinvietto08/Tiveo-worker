import { View, Image, StyleSheet, Text } from "react-native";
import { getIcon } from "../../../../utils/getIcons";
import { colors } from "../../../../styles/globalStyles";

const WorkerMarker = ({ worker }) => {
  const displayedServices = worker.services.slice(0, 2);
  const extraServicesCount = worker.services.length - displayedServices.length;

  return (
    <View style={styles.map__markers__worker__markerContainer}>
      <Image
        source={worker.photoURL}
        style={styles.map__markers__worker__workerImage}
      />
      <View style={styles.map__markers__worker__servicesContainer}>
        {extraServicesCount > 0 && (
          <View style={styles.map__markers__worker__serviceIcon}>
            <Text style={styles.map__markers__worker__serviceText}>
              +{extraServicesCount}
            </Text>
          </View>
        )}
        {displayedServices.map((service, index) => {
          const ServiceIcon = getIcon(service.service); // Obtén el ícono correspondiente
          return (
            <View key={index} style={styles.map__markers__worker__serviceIcon}>
              <ServiceIcon width={16} height={16} />
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  map__markers__worker__markerContainer: {
    width: 68,
    height: 56,
    alignItems: "center",
  },
  map__markers__worker__workerImage: {
    width: 46,
    height: 46,
    borderRadius: 50,
  },
  map__markers__worker__servicesContainer: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
  },
  map__markers__worker__serviceIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: -8,
    backgroundColor: colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 1,
    borderWidth: 1,
    borderColor: colors.white,
  },
  map__markers__worker__serviceText: {
    fontSize: 12,
    color: colors.black,
    fontFamily: "Inter-Bold",
    marginLeft: 3,
  },
});

export default WorkerMarker;
