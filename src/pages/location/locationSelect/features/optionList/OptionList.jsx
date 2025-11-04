import React, { useEffect, useState, useContext } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { styles } from "./OptionListStyles";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import firestore from "@react-native-firebase/firestore";
import { LocationContext } from "../../../../../context/LocationContext";
import { UserContext } from "../../../../../context/UserContext";
import { colors } from "../../../../../styles/globalStyles";

const DefaultItem = ({ item, navigation }) => {
  let iconName;

  if (item.key === "1") {
    iconName = "location-crosshairs";
  } else if (item.key === "2") {
    iconName = "map-pin";
  }

  const handlePress = () => {
    if (item.key === "1") {
      navigation.navigate("LocationMap", { getLocation: true });
    } else if (item.key === "2") {
      navigation.navigate("LocationMap", { getLocation: false });
    }
  };

  return (
    <Pressable
      style={styles.locationSelect__optionList__defaultContainer}
      onPress={handlePress}
    >
      <View style={styles.locationSelect__optionList__iconContainer}>
        <FontAwesome6 name={iconName} size={18} color={colors.primary} />
      </View>
      <View style={styles.locationSelect__optionList__subContainer}>
        <Text style={styles.locationSelect__optionList__optionName}>
          {item.name}
        </Text>
      </View>
    </Pressable>
  );
};

const LocationItem = ({ item, onSelect }) => {
  const iconName = item.name ? "house" : "location-dot";

  return (
    <Pressable
      style={styles.locationSelect__optionList__addressContainer}
      onPress={() => onSelect(item)}
    >
      <View style={styles.locationSelect__optionList__iconContainer}>
        <FontAwesome6 name={iconName} size={18} color="black" />
      </View>
      <View style={styles.locationSelect__optionList__subContainer}>
        <Text style={styles.locationSelect__optionList__addressName}>
          {item.name ||
            item.address_components[1]?.long_name +
              " " +
              item.address_components[0]?.short_name}
        </Text>
        {item.name && (
          <Text style={styles.locationSelect__optionList__addressDetails}>
            {item.address_components[1]?.long_name +
              " " +
              item.address_components[0]?.short_name}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

const OptionList = ({ navigation, setShowLoading }) => {
  const [locations, setLocations] = useState([]);
  const { setLocation } = useContext(LocationContext);
  const { user } = useContext(UserContext);

  const defaultOptions = [
    { key: "1", name: "Mi ubicación actual" },
    { key: "2", name: "Seleccionar en el mapa" },
  ];

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const workerRef = firestore().collection("workers").doc(user.uid);
        const workerSnapshot = await workerRef.get();

        if (!workerSnapshot.exists) {
          console.log("El worker no existe en Firestore.");
          return;
        }
        const addressesSnapshot = await workerRef.collection("addresses").get();

        const addressesList = addressesSnapshot.docs.map((doc) => ({
          key: doc.id,
          ...doc.data(),
        }));

        setLocations(addressesList);
      } catch (error) {
        console.error("Error al obtener direcciones de Firestore:", error);
      } finally {
        setTimeout(() => {
          setShowLoading(false);
        }, 1500);
      }
    };

    fetchAddresses();
  }, []);

  const handleSelectLocation = (item) => {
    const { key, ...locationData } = item;
    setLocation(locationData);
  };

  const renderItem = ({ item }) => {
    if (item.key === "1" || item.key === "2") {
      return <DefaultItem item={item} navigation={navigation} />;
    } else {
      return <LocationItem item={item} onSelect={handleSelectLocation} />;
    }
  };

  return (
    <View style={styles.locationSelect__optionList__container}>
      <FlatList
        data={[...defaultOptions, ...locations]}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default OptionList;
