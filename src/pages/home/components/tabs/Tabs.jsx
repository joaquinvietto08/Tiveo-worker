import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./TabsStyles";

const Tabs = ({ activeTab, setActiveTab }) => {
  const tabs = ["Solicitudes", "Programadas", "Completadas"];

  return (
    <View  style={styles.home__tabs__mainContainer}>
      <View style={styles.home__tabs__container}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.home__tabs__button,
              activeTab === tab && styles.home__tabs__button__active,
            ]}
            onPress={() => setActiveTab(tab)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.home__tabs__text,
                activeTab === tab && styles.home__tabs__text__active,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Tabs;
