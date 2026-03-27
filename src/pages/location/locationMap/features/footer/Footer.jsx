import React from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import BottomSheet from "../../../../../components/bottomSheet/BottomSheet";
import { styles } from "./FooterStyles";

const Footer = ({ address, loading, addressComponents, navigation }) => {
  const snapPoints = [200];

  return (
    <BottomSheet
      snapPoints={snapPoints}
      indexVal={0}
      handleIndicatorStyle={{ height: 0 }}
      enablePanDownToClose={false}
      enableOverDrag={false}
      enablePanGesture={false}
      overlay={false}
      isOpen={true}
    >
      <View>
        <Text style={styles.locationMap__footer__title}>
          Confirmar mi ubicación
        </Text>
        <View style={styles.locationMap__footer__addressContainer}>
          <View style={styles.locationMap__footer__subContainer}>
            <Text style={styles.locationMap__footer__text}>
              {address || "Obteniendo dirección..."}
            </Text>
          </View>
          {loading ? (
            <ActivityIndicator size="small" color="#000" />
          ) : (
            <Pressable
              onPress={() =>
                navigation.navigate("SaveAddress", { addressComponents })
              }
            >
              <Text style={styles.locationMap__footer__confirmText}>
                Confirmar
              </Text>
            </Pressable>
          )}
        </View>
      </View>
    </BottomSheet>
  );
};

export default Footer;
