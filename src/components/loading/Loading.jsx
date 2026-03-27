import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import TiveoFav from "../../../assets/svgs/tiveoFav.svg";
import { styles } from "./LoadingStyles";

const Loading = () => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.5,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.LoadingContainer}>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TiveoFav width={50} height={50} fill={"#fff"} />
      </Animated.View>
    </View>
  );
};

export default Loading;
