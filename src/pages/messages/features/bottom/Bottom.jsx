import React, { useState } from "react";
import { Alert, Pressable, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import TextInputComponent from "../../../../components/inputs/textInput/TextInput";
import ImageIcon from "../../../../../assets/svgs/image";
import { colors } from "../../../../styles/globalStyles";
import { styles } from "./BottomStyles";
import * as ImagePicker from "expo-image-picker";

const MAXLEN = 100;

const Bottom = ({ onSendText, onSendImage }) => {
  const [text, setText] = useState("");

  const handleSend = async () => {
    const t = text.trim();
    if (!t) return;
    setText("");
    try {
      await onSendText?.(t);
    } catch (e) {
      console.warn("Error al enviar:", e);
      Alert.alert("Error", "No se pudo enviar el mensaje.");
    }
  };

const pickOneImage = async () => {
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      quality: 0.9,
    });
    if (result.canceled) return;

    const asset = result.assets[0];
    const localUri = asset.uri;

    await onSendImage?.({ uri: localUri });
  } catch (e) {
    console.warn("Error al seleccionar imagen:", e);
  }
};

  return (
    <View style={styles.messages__bottom__container}>
      <View style={styles.messages__bottom__subcontainer}>
        <Pressable
          style={styles.messages__bottom__imageButton}
          onPress={pickOneImage}
        >
          <ImageIcon />
        </Pressable>

        <TextInputComponent
          placeholder="Escribe un mensaje..."
          style={styles.messages__bottom__input}
          borderless
          multiline
          maxLength={MAXLEN}
          value={text}
          onChangeText={setText}
        />
      </View>

      <Pressable
        style={[
          styles.messages__bottom__sendButton,
          !text.trim() && { opacity: 0.5 },
        ]}
        onPress={handleSend}
        disabled={!text.trim()}
      >
        <Ionicons name="send" size={24} color={colors.black} />
      </Pressable>
    </View>
  );
};

export default Bottom;
