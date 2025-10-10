import React from "react";
import { View, Text } from "react-native";
import { styles } from "./StatsStyles";

const Stats = ({ jobs = 0, rating = null, earnings = 0 }) => {
  return (
    <View style={styles.home__stats__container}>
      {/* Bloque: Trabajos */}
      <View style={styles.home__stats__item}>
        <Text style={styles.home__stats__number}>{jobs}</Text>
        <Text style={styles.home__stats__label}>Trabajos</Text>
      </View>

      {/* Bloque: Calificación */}
      <View style={styles.home__stats__item}>
        <Text style={styles.home__stats__number}>{rating ? rating.toFixed(1) : "--"}</Text>
        <Text style={styles.home__stats__label}>Calificación</Text>
      </View>

      {/* Bloque: Este mes */}
      <View style={styles.home__stats__item}>
        <Text style={styles.home__stats__number}>${earnings}</Text>
        <Text style={styles.home__stats__label}>Este mes</Text>
      </View>
    </View>
  );
};

export default Stats;
