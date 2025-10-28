import { Modal, Pressable, Text, View } from "react-native";
import { styles } from "./LoadingButtonStyles";
import * as Progress from "react-native-progress";
import { colors } from "../../../styles/globalStyles";
import { useEffect, useState } from "react";
import { Dimensions } from "react-native";

const LoadingButton = ({
  text,
  loading,
  onPress,
  option = "primary",
  paddingBottom = 60,
}) => {
  const [progress, setProgress] = useState(0);
  const [showLoading, setShowLoading] = useState(false);
  const screenWidth = Dimensions.get("window").width;

  const buttonBgColors = {
    primary: colors.primary,
    secondary: colors.black,
  };

  useEffect(() => {
    let timeout1, timeout2, timeout3;

    if (loading) {
      setProgress(0);
      setShowLoading(true);
      timeout1 = setTimeout(() => setProgress(0.6), 500);
      timeout2 = setTimeout(() => setProgress(0.9), 1500);
    } else {
      timeout2 = setTimeout(() => setProgress(1), 500);
      setTimeout(() => {
        setShowLoading(false);
      }, 1000);
    }
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  }, [loading]);

  const progressBarConfigs = {
    primary: {
      progress,
      width: screenWidth - 39,
      color: colors.primary,
      height: 50,
      borderRadius: 10,
      unfilledColor: "#FFC362",
      borderWidth: 0,
      animationType: "timing",
      useNativeDriver: true,
    },
    secondary: {
      progress,
      width: screenWidth - 39,
      color: colors.black,
      height: 50,
      borderRadius: 10,
      unfilledColor: "#838383",
      borderWidth: 0,
      animationType: "timing",
      useNativeDriver: true,
    },
  };

  return (
    <>
      <Modal transparent visible={showLoading} animationType="fade">
        <View
          style={[
            styles.inputs__loadingButton__overlay,
            { paddingBottom },
          ]}
        >
          <View style={styles.inputs__loadingButton__progressWrapper}>
            <Progress.Bar {...progressBarConfigs[option]} />
            <Text style={styles.inputs__loadingButton__progressText}>
              {text}
            </Text>
          </View>
        </View>
      </Modal>
      <Pressable
        disabled={loading}
        onPress={onPress}
        style={[
          styles.inputs__loadingButton__button,
          { backgroundColor: buttonBgColors[option] },
        ]}
      >
        <Text style={styles.inputs__loadingButton__text}>{text}</Text>
      </Pressable>
    </>
  );
};

export default LoadingButton;
