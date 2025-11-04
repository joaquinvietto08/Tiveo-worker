import { View, Image, StyleSheet, Text } from "react-native";
import { formatPrice } from "../../../../utils/formatHelpers";
import { colors } from "../../../../styles/globalStyles";

const PostulantMarker = ({ postulant }) => {
  const priceText =
    postulant.price != null ? formatPrice(postulant.price) : null;

  return (
    <View style={styles.map__markers__postulant__markerContainer}>
      <Image
        source={postulant.photoURL}
        style={styles.map__markers__postulant__postulantImage}
      />
      <View style={styles.map__markers__postulant__priceContainer}>
        {postulant.price != null ? (
          <Text style={styles.map__markers__postulant__priceText}>
            {priceText}
          </Text>
        ) : (
          <Text style={styles.map__markers__postulant__priceText}>
            {"$ A definir"}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  map__markers__postulant__markerContainer: {
    minHeight: 56,
    alignItems: "center",
  },
  map__markers__postulant__postulantImage: {
    width: 46,
    height: 46,
    borderRadius: 50,
  },
  map__markers__postulant__postulantContainer: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
  },
  map__markers__postulant__notPriceContainer: {
    height: 24,
    borderRadius: 20,
    backgroundColor: colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 3,
    borderWidth: 1,
    borderColor: colors.white,
  },
  map__markers__postulant__priceContainer: {
    height: 24,
    borderRadius: 20,
    marginTop: -10,
    backgroundColor: colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 3,
    borderWidth: 1,
    borderColor: colors.white,
  },
  map__markers__postulant__priceText: {
    fontSize: 12,
    color: colors.black,
    fontFamily: "Inter-Bold",
    textAlign: "center",
  },
});

export default PostulantMarker;
