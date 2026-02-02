import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "../ActivityDetailStyles";
import { colors } from "../../../styles/globalStyles";

const ActionButtons = ({
  onPressMessages,
  messagesDisabled,
  onPressCancel,
  cancelDisabled,
  cancelLabel,
  isCancelling,
}) => {
  return (
    <View style={styles.activityDetail__actionsCard}>
      <TouchableOpacity
        style={[
          styles.activityDetail__messageButton,
          messagesDisabled && styles.activityDetail__messageButtonDisabled,
        ]}
        activeOpacity={messagesDisabled ? 1 : 0.85}
        onPress={messagesDisabled ? undefined : onPressMessages}
        disabled={messagesDisabled}
      >
        <MaterialIcons
          name="chat-bubble-outline"
          size={20}
          color={messagesDisabled ? colors.gray : colors.white}
        />
        <Text
          style={[
            styles.activityDetail__messageButtonText,
            messagesDisabled && styles.activityDetail__messageButtonTextDisabled,
          ]}
        >
          Mensajes
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.activityDetail__cancelButton,
          cancelDisabled && styles.activityDetail__cancelButtonDisabled,
        ]}
        activeOpacity={cancelDisabled ? 1 : 0.85}
        onPress={cancelDisabled ? undefined : onPressCancel}
        disabled={cancelDisabled || isCancelling}
      >
        {isCancelling ? (
          <ActivityIndicator color={colors.gray} />
        ) : (
          <>
            <MaterialIcons
              name="highlight-off"
              size={20}
              color={
                cancelDisabled
                  ? colors.gray
                  : "red"
              }
            />
            <Text
              style={[
                styles.activityDetail__cancelButtonText,
                cancelDisabled && styles.activityDetail__cancelButtonTextDisabled,
              ]}
            >
              {cancelLabel || "Cancelar trabajo"}
            </Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ActionButtons;
