import React, { useMemo } from "react";
import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "../ActivityDetailStyles";
import { colors } from "../../../styles/globalStyles";

const RatingSection = ({ activity }) => {
  const ratingValue = useMemo(() => {
    if (!activity) return null;
    if (activity.rating && typeof activity.rating === "number")
      return activity.rating;
    if (activity.rating && typeof activity.rating === "string") {
      const parsed = Number(activity.rating);
      return Number.isNaN(parsed) ? null : parsed;
    }
    if (activity.review?.rating) return activity.review.rating;
    if (activity.clientReview?.rating) return activity.clientReview.rating;
    return null;
  }, [activity]);

  const ratingComment =
    activity?.review?.comment ||
    activity?.clientReview?.comment ||
    activity?.ratingComment ||
    null;

  return (
    <View style={styles.activityDetail__sectionCard}>
      <Text style={styles.activityDetail__sectionTitle}>Calificación</Text>

      <View style={styles.activityDetail__ratingRow}>
        <MaterialIcons
          name="star-rate"
          size={24}
          color={ratingValue ? colors.yellow : colors.lightGray}
        />
        <Text style={styles.activityDetail__ratingText}>
          {ratingValue ? `Calificado con ${ratingValue}` : "Sin calificación"}
        </Text>
      </View>

      {ratingComment ? (
        <Text style={styles.activityDetail__ratingComment}>
          “{ratingComment}”
        </Text>
      ) : null}
    </View>
  );
};

export default RatingSection;
