import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./HeaderStyles";
import { colors } from "../../../../styles/globalStyles";

const Header = ({ status, onPressStatus }) => {
  const worker = {
    name: "Angel Zanini",
    photo: "https://i.pravatar.cc/300?img=12",
    location: "Córdoba Capital",
    stats: { jobs: 0, rating: null, earnings: 0 },
  };

  return (
    <View style={styles.home__header__card}>
      <View style={styles.home__header__rowTop}>
        <View style={styles.home__header__avatarWrap}>
          <Image
            source={{ uri: worker.photo }}
            style={styles.home__header__avatar}
          />
          <TouchableOpacity
            style={styles.home__header__settingsBtn}
            activeOpacity={0.7}
          >
            <Ionicons name="settings-sharp" size={18} color={colors.black} />
          </TouchableOpacity>
        </View>
        <Text style={styles.home__header__name}>{worker.name}</Text>

        </View>
    </View>
  );
};

export default Header;
