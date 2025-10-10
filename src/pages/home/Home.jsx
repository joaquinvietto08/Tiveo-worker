import React, { useState } from "react";
import { StatusBar, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "./components/header/Header";
import { styles } from "./HomeStyles";
import { colors } from "../../styles/globalStyles";
import State from "./components/state/State";
import Stats from "./components/stats/Stats";

const Home = () => {
  const insets = useSafeAreaInsets();
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState("Activo");

  return (
    <View style={{ ...styles.home__container, paddingTop: insets.top }}>
      <StatusBar backgroundColor={colors.white} />
      <Header />
      <State />
      {showModal && (
        <StateModal
          visible={showModal}
          currentStatus={status}
          onClose={() => setShowModal(false)}
          onSelect={(newStatus) => {
            setStatus(newStatus);
            setShowModal(false);
          }}
        />
      )}
      <Stats jobs={0} rating={null} earnings={0} />
    </View>
  );
};

export default Home;
