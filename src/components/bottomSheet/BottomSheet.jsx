import React, { forwardRef } from "react";
import { Pressable } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { styles } from "./BottomSheetStyles";
import { colors } from "../../styles/globalStyles";

const BottomSheetComponent = forwardRef(
  (
    {
      children,
      snapPoints,
      index,
      isOpen = true,
      overlay = false,
      onClose,
      handleStyle,
      ...props
    },
    ref
  ) => {
    const bottomSheetProps = {
      ref,
      snapPoints,
      index,
      handleStyle,
      handleIndicatorStyle: { backgroundColor: "#D8D8D8" },
      backgroundStyle: {
        backgroundColor: colors.background,
        shadowColor: "#000",
        elevation: 20,
      },
      ...props,
    };

    return (
      <>
        {overlay && isOpen && (
          <Pressable style={styles.bottomSheet__overlay} onPress={onClose} />
        )}
        <BottomSheet {...bottomSheetProps}>{children}</BottomSheet>
      </>
    );
  }
);

export default BottomSheetComponent;
