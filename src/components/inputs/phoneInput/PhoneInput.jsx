import React, { useRef, useState } from "react";
import { Keyboard, Pressable, Text, TextInput, View } from "react-native";
import { styles } from "./PhoneInputStyles";
import { countries } from "../../../utils/countries";
import Icon from "react-native-vector-icons/MaterialIcons";
import { FlatList } from "react-native-gesture-handler";
import { Host, Portal } from "react-native-portalize";
import BottomSheet from "../../bottomSheet/BottomSheet";
import { colors } from "../../../styles/globalStyles";

const PhoneInputComponent = ({
  style,
  placeholder = "Ej: 123456789",
  placeholderTextColor = "#8A8A8A",
  selectionColor = colors.primary,
  cursorColor = "black",
  maxLength = 15,
  value,
  onChangeText,
  selectedCountry,
  setSelectedCountry,
  ...props
}) => {
  const sheetRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const snapPoints = ["75%"];

  const selectCountry = (country) => {
    setSelectedCountry(country);
    handleCloseBottomSheet();
  };

  const handleOpenBottomSheet = () => {
    Keyboard.dismiss();
    setIsOpen(true);
    sheetRef.current?.snapToIndex(0);
  };

  const handleCloseBottomSheet = () => {
    setIsOpen(false);
    sheetRef.current?.close();
  };

  return (
    <View style={styles.inputs__phoneInput__container}>
      <Pressable
        style={styles.inputs__phoneInput__selectCountry}
        onPress={handleOpenBottomSheet}
      >
        <Text style={styles.inputs__phoneInput__flag}>
          {selectedCountry.flag}
        </Text>
        <Icon name="keyboard-arrow-down" size={29} color="#000" />
      </Pressable>
      <View style={styles.inputs__phoneInput__InputContainer}>
        <Text style={styles.inputs__phoneInput__countryCode}>
          {selectedCountry.code}
        </Text>
        <TextInput
          style={styles.inputs__phoneInput__textInput}
          keyboardType="numeric"
          maxLength={maxLength}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          selectionColor={selectionColor}
          cursorColor={cursorColor}
          onChangeText={(text) => {
            const numericText = text.replace(/[^0-9]/g, "");
            onChangeText(numericText);
          }}
          {...props}
        />
      </View>

      {isOpen && (
        <Portal>
          <BottomSheet
            ref={sheetRef}
            snapPoints={snapPoints}
            indexVal={0}
            overlay={true}
            isOpen
            enablePanDownToClose={true}
            onClose={handleCloseBottomSheet}
          >
            <View style={styles.inputs__phoneInput__contentContainer}>
              <FlatList
                data={countries}
                keyExtractor={(item) => item.code}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <Pressable
                    style={styles.inputs__phoneInput__countryItem}
                    onPress={() => selectCountry(item)}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text
                        style={{
                          ...styles.inputs__phoneInput__flag,
                          marginRight: 10,
                        }}
                      >
                        {item.flag}
                      </Text>
                      <Text style={styles.inputs__phoneInput__countryName}>
                        {item.name}
                      </Text>
                    </View>
                    <Text style={styles.inputs__phoneInput__countryCode}>
                      {item.code}
                    </Text>
                  </Pressable>
                )}
                ItemSeparatorComponent={() => (
                  <View style={styles.inputs__phoneInput__separator} />
                )}
              />
            </View>
          </BottomSheet>
        </Portal>
      )}
    </View>
  );
};

export default PhoneInputComponent;
