import React, { useContext, useMemo } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./ProfileStyles";
import { colors } from "../../styles/globalStyles";
import { UserContext } from "../../context/UserContext";
import { translateService } from "../../utils/formatHelpers";
import { getIcon } from "../../utils/getIcons";
import { LocationContext } from "../../context/LocationContext";
import { getAuth, signOut } from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { AccessToken, LoginManager } from "react-native-fbsdk-next";

const Profile = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { user } = useContext(UserContext);
  const { setLocation } = useContext(LocationContext);
  const authInstance = getAuth();

  const fullName = useMemo(() => {
    const name = user?.name || "";
    const lastName = user?.lastName || "";
    const composed = `${name} ${lastName}`.trim();
    return composed || name || lastName || "";
  }, [user?.name, user?.lastName]);

  const services = Array.isArray(user.services) ? user.services : [];

  const handleSignOut = async () => {
    const currentUser = authInstance.currentUser;
    setLocation(null);

    if (currentUser) {
      const providerId = currentUser.providerData[0]?.providerId;
      try {
        await signOut(authInstance);
        console.log("Sesión cerrada en Firebase.");

        if (providerId === "google.com") {
          try {
            await GoogleSignin.revokeAccess();
            console.log("Sesión de Google cerrada.");
          } catch (error) {
            console.error("Error cerrando sesión de Google:", error);
          }
        }

        if (providerId === "facebook.com") {
          try {
            const currentAccessToken =
              await AccessToken.getCurrentAccessToken();
            if (currentAccessToken) {
              await LoginManager.logOut();
              console.log("Sesión de Facebook cerrada.");
            }
          } catch (error) {
            console.error("Error cerrando sesión de Facebook:", error);
          }
        }
      } catch (error) {
        console.error("Error cerrando sesión:", error);
        alert("Error al cerrar sesión: " + error.message);
      }
    } else {
      console.log("No hay usuario autenticado.");
    }
  };

  if (!user) {
    return (
      <View style={styles.profile__loaderContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const photoUri =
    user.photo ||
    "https://firebasestorage.googleapis.com/v0/b/tiveo-5f6c4.firebasestorage.app/o/workers%2Fprofile-default.png?alt=media&token=303a2092-c01f-4173-a7e4-e7b2d37b12c0";

  const initialWorkerData = {
    name: user.name || "",
    lastName: user.lastName || "",
    workerName: user.workerName || "",
    phone: user.phone || "",
    birthDate: user.birthDate || "",
    photo: user.photo || null,
    description: user.description || "",
    services: Array.isArray(user.services) ? user.services : [],
  };

  return (
    <View
      style={[
        styles.profile__container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
      ]}
    >
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={styles.profile__content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profile__header}>
          <TouchableOpacity
            style={styles.profile__backBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={22} color={colors.black} />
          </TouchableOpacity>
          <Text style={styles.profile__headerTitle}>Mi cuenta</Text>
        </View>
        <Image source={{ uri: photoUri }} style={styles.profile__avatar} />
        <Text style={styles.profile__name}>{fullName}</Text>
        {user.workerName ? (
          <Text style={styles.profile__workerName}>{user.workerName}</Text>
        ) : null}

        <View style={styles.profile__card}>
          <View style={styles.profile__section}>
            <Text style={styles.profile__sectionLabel}>Teléfono</Text>
            <Text style={styles.profile__sectionValue}>
              {user.phone || "Sin información"}
            </Text>
          </View>

          <View style={styles.profile__section}>
            <Text style={styles.profile__sectionLabel}>
              Fecha de nacimiento
            </Text>
            <Text style={styles.profile__sectionValue}>
              {user.birthDate || "Sin información"}
            </Text>
          </View>

          <View style={styles.profile__section}>
            <Text style={styles.profile__sectionLabel}>Descripción</Text>
            {user.description ? (
              <Text style={styles.profile__description}>
                {user.description}
              </Text>
            ) : (
              <Text style={styles.profile__emptyText}>
                Completa tu descripción para destacar tus servicios.
              </Text>
            )}
          </View>

          <View style={styles.profile__section}>
            <Text style={styles.profile__sectionLabel}>Servicios</Text>
            {services.length > 0 ? (
              <View style={styles.profile__servicesList}>
                {services.map((srv, index) => {
                  const ServiceIcon = getIcon(srv);
                  return (
                    <View key={index} style={styles.profile__serviceChip}>
                      <ServiceIcon width={18} height={18} />
                      <Text style={styles.profile__serviceChipText}>
                        {translateService(srv)}
                      </Text>
                    </View>
                  );
                })}
              </View>
            ) : (
              <Text style={styles.profile__emptyText}>
                Todavía no agregaste servicios.
              </Text>
            )}
          </View>
        </View>

        <TouchableOpacity
          style={styles.profile__editButton}
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate("ProfileEdit", {
              mode: "edit",
              initialWorkerData,
            })
          }
        >
          <Text style={styles.profile__editButtonText}>Editar datos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.profile__logoutButton}
          activeOpacity={0.8}
          onPress={handleSignOut}
        >
          <Text style={styles.profile__logoutButtonText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Profile;
