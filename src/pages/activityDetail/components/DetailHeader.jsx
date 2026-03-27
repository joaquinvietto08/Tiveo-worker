import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../ActivityDetailStyles";
import { colors } from "../../../styles/globalStyles";

const DetailHeader = ({ title, subtitle }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.activityDetail__header}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="arrow-back" size={24} color={colors.black} />
      </TouchableOpacity>

      <View>
        <Text style={styles.activityDetail__headerTitle}>
          {title || "Detalle del trabajo"}
        </Text>
        {subtitle ? (
          <Text style={styles.activityDetail__headerSubtitle}>{subtitle}</Text>
        ) : null}
      </View>
    </View>
  );
};

export default DetailHeader;
