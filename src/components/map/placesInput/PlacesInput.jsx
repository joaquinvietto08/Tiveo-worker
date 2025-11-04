import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { StyleSheet } from "react-native";

const GOOGLE_PLACES_API_KEY = "AIzaSyCcBYIbLnlMIzRijdTr01DXGCTNfPNKUc4";

export const GooglePlacesInput = ({ ...props }) => {
  return (
    <GooglePlacesAutocomplete
      placeholder="Buscar direccion"
      minLength={2}
      fetchDetails={true}
      query={{
        key: GOOGLE_PLACES_API_KEY,
        language: "es",
        types: "address",
        components: "country:ar",
      }}
      styles={styles}
      enablePoweredByContainer={false}
      isRowScrollable={false}
      onFail={(error) => console.error(error)}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    height: "auto",
  },
  textInputContainer: {},
  textInput: {
    height: 48,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#C8C8C8",
    borderRadius: 8,
  },
  listView: {},
  row: {
    backgroundColor: "transparent",
    padding: 0,
    height: "auto",
  },
  separator: {
    height: 0,
  },
});
