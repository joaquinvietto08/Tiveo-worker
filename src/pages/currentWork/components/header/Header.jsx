import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./HeaderStyles";
import { useNavigation } from "@react-navigation/native";
import { translateStatus } from "../../../../utils/formatHelpers";
import { colors } from "../../../../styles/globalStyles";

const Header = ({ status, isWarranty }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.currentWork__header__container}>
      <View style={styles.currentWork__header__topRow}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.currentWork__header__title}>
          {isWarranty
            ? "Reclamo de garantía"
            : status === "confirm" || status === "starting"
            ? "Próximo trabajo"
            : "Trabajo activo"}
        </Text>
      </View>

      <View style={styles.currentWork__header__statusRow}>
        <View
          style={[
            styles.currentWork__header__statusDot,
            isWarranty
              ? { backgroundColor: "#F6C23E" }
              : status === "going"
              ? { backgroundColor: "#4E73DF" }
              : status === "on-progress"
              ? { backgroundColor: "#F6C23E" }
              : { backgroundColor: colors.green },
          ]}
        />
        <Text style={styles.currentWork__header__statusText}>
          {isWarranty ? "reclamo de garantía" : translateStatus(status).toLowerCase()}
        </Text>
      </View>
    </View>
  );
};

export default Header;
