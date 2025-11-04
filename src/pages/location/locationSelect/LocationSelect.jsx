import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./LocationSelectStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import OptionList from "./features/optionList/OptionList";
import SearchBar from "./features/searchBar/SearchBar";
import Loading from "../../../components/loading/Loading";

const LocationSelect = ({ navigation }) => {
  const [error, setError] = useState(null);
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const [inputValue, setInputValue] = useState("");
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    if (route.params?.errorMsg) {
      setError(route.params.errorMsg);
      setTimeout(() => {
        setError(null);
        navigation.setParams({ errorMsg: undefined });
      }, 5000);
    }
  }, [route.params?.errorMsg]);

  return (
    <>
      <View
        style={{
          ...styles.mainContainer,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
      >
        <View style={styles.locationSelect__header}>
          <Pressable
            style={styles.locationSelect__headerButton}
            onPress={() => navigation.navigate("Profile")}
          >
            <Text style={styles.locationSelect__headerText}>Ver perfil</Text>
          </Pressable>
        </View>

        <View style={styles.locationSelect__container}>
          <Text style={styles.locationSelect__title}>Elije tu ubicación</Text>
          <Text style={styles.locationSelect__subtitle}>
            Necesitamos tu ubicación para mostrarte los trabajos solicitados que estén a tu alcance
          </Text>
        </View>

        <SearchBar
          navigation={navigation}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />

        {inputValue === "" && (
          <OptionList navigation={navigation} setShowLoading={setShowLoading} />
        )}

        {error && (
          <View style={styles.locationSelect__errorContainer}>
            <Text style={styles.locationSelect__errorText}>{error}</Text>
          </View>
        )}
      </View>

      {showLoading && <Loading />}
    </>
  );
};

export default LocationSelect;
