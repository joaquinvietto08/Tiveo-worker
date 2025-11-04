import React, { useState } from "react";
import { View, Pressable, Text } from "react-native";
import { styles } from "./FormStyles";
import TextInput from "../../../../../components/inputs/textInput/TextInput";

const Form = ({ onSubmit }) => {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (name.trim()) {
      onSubmit({ name: name.trim() });
    }
  };

  return (
    <View>
      <TextInput
        style={styles.saveAddress__form__nameInput}
        maxLength={30}
        placeholder="Nombre de ubicación"
        value={name}
        onChangeText={setName}
      />
      <Pressable
        style={styles.saveAddress__form__saveButton}
        onPress={handleSubmit}
      >
        <Text style={styles.saveAddress__form__textButton}>
          Guardar direccion
        </Text>
      </Pressable>
    </View>
  );
};

export default Form;
