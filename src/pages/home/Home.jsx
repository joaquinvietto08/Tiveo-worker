import React, { useState } from "react";
import { ScrollView, StatusBar, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "./components/header/Header";
import { styles } from "./HomeStyles";
import { colors } from "../../styles/globalStyles";
import State from "./components/state/State";
import Stats from "./components/stats/Stats";
import Tabs from "./components/tabs/Tabs";
import Schedules from "./components/tabs/schedules/Schedules";
import Completed from "./components/tabs/completed/Completed";
import Requests from "./components/tabs/requests/Requests";

const Home = () => {
  const insets = useSafeAreaInsets();
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState("Activo");
  const [activeTab, setActiveTab] = useState("Solicitudes");

  return (
    <View
      style={{
        ...styles.home__container,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <StatusBar backgroundColor={colors.white} translucent={false} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[3]} // 👈 el índice de Tabs dentro del ScrollView
        contentContainerStyle={styles.home__scrollContent}
      >
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
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {{
          Solicitudes: <Requests />,
          Programadas: <Schedules />,
          Completadas: <Completed />,
        }[activeTab] || null}
      </ScrollView>
    </View>
  );
};

export default Home;
