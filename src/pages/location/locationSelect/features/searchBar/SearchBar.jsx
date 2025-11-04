import React from "react";
import { GooglePlacesInput } from "../../../../../components/map/placesInput/PlacesInput";
import { Text, View } from "react-native";
import { styles } from "./SearchBarStyles";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const SearchBar = ({ navigation, setInputValue }) => {
  const renderCustomRow = (item) => {
    return (
      <View style={styles.locationSelect__searchBar__addressContainer}>
        <View style={styles.locationSelect__searchBar__iconContainer}>
          <FontAwesome6 name="location-dot" size={18} color="black" />
        </View>
        <View style={styles.locationSelect__searchBar__subContainer}>
          <Text style={styles.locationSelect__searchBar__addressName}>
            {item.description}
          </Text>
        </View>
      </View>
    );
  };

  const handleLocationSelected = (data, details) => {
    const location = {
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
      address: data.structured_formatting.main_text,
    };
    navigation.navigate("LocationMap", { selectedLocation: location });
  };

  return (
    <View style={styles.google_inputContainer}>
      <GooglePlacesInput
        renderRow={(data) => renderCustomRow(data)}
        textInputProps={{
          onChangeText: (text) => setInputValue(text),
        }}
        onPress={(data, details = null) => {
          handleLocationSelected(data, details);
        }}
      />
    </View>
  );
};

export default SearchBar;
