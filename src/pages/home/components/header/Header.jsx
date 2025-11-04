import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./HeaderStyles";
import { colors } from "../../../../styles/globalStyles";
import { UserContext } from "../../../../context/UserContext";

const Header = ({ status, onPressStatus }) => {
  const { user } = useContext(UserContext);

  // Construir el nombre completo: name + lastName
  const fullName = `${user?.name || ""} ${user?.lastName || ""}`.trim() || user?.name || "";
  const workerName = user?.workerName || "";

  return (
    <View style={styles.home__header__card}>
      <View style={styles.home__header__rowTop}>
        <View style={styles.home__header__avatarWrap}>
          <Image
            source={{
              uri:
                user?.photo ||
                "https://firebasestorage.googleapis.com/v0/b/tiveo-5f6c4.firebasestorage.app/o/workers%2Fprofile-default.png?alt=media&token=303a2092-c01f-4173-a7e4-e7b2d37b12c0",
            }}
            style={styles.home__header__avatar}
          />
          <TouchableOpacity
            style={styles.home__header__settingsBtn}
            activeOpacity={0.7}
          >
            <Ionicons name="settings-sharp" size={18} color={colors.black} />
          </TouchableOpacity>
        </View>
        <View style={styles.home__header__infoCol}>
          <Text style={styles.home__header__fullName}>{fullName}</Text>
          {workerName ? (
            <Text style={styles.home__header__workerName}>{workerName}</Text>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default Header;
