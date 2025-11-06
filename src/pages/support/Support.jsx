import React, { useContext, useEffect, useState } from "react";
import { View, Text, Pressable, Keyboard } from "react-native";
import { styles } from "./SupportStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import firestore from "@react-native-firebase/firestore";
import { useNavigation, useRoute } from "@react-navigation/native";
import { UserContext } from "../../context/UserContext";
import TextInputComponent from "../../components/inputs/textInput/TextInput";

const Support = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (route.params?.message) {
      setMessage(route.params.message);
    }
  }, [route.params?.message]);

  const handleSend = async () => {
    if (!message.trim() || loading) return;

    try {
      setLoading(true);
      Keyboard.dismiss();

      await firestore()
        .collection("support")
        .add({
          message: message.trim(),
          uid: user?.uid,
          user: "client",
          createdAt: firestore.FieldValue.serverTimestamp(),
          activityId: route.params?.activityId ?? "",
        });

      setSent(true);
      setMessage("");

      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={[
        styles.support__container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <Text style={styles.support__title}>Ayuda</Text>
      <Text style={styles.support__subtitle}>
        ¿Tenés dudas, consultas o problemas con un trabajo? Escribinos y te
        respondemos por mail
      </Text>

      <TextInputComponent
        style={styles.support__input}
        value={message}
        onChangeText={setMessage}
        placeholder="Escribí tu mensaje..."
        multiline
        textAlignVertical="top"
      />

      <View style={styles.support__buttonRow}>
        <Pressable
          style={[styles.support__button, styles.support__cancel]}
          onPress={() => navigation.goBack()}
          disabled={loading}
        >
          <Text style={styles.support__cancelText}>Cancelar</Text>
        </Pressable>

        <Pressable
          style={[
            styles.support__button,
            styles.support__send,
            (!message.trim() || loading) && styles.support__disabled,
          ]}
          onPress={handleSend}
          disabled={!message.trim() || loading}
        >
          <Text style={styles.support__sendText}>
            {loading ? "Enviando..." : "Enviar mensaje"}
          </Text>
        </Pressable>
      </View>
      {sent && (
        <View style={styles.support__confirmation}>
          <Text style={styles.support__confirmationText}>
            Tu mensaje fue enviado. Nos comunicaremos con vos en breve.
          </Text>
        </View>
      )}
    </View>
  );
};

export default Support;
