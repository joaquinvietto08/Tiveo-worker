import { View, Text, TextInput } from "react-native";
import { styles } from "./BodyStyles";

const Body = ({setBudget, setMessage, budget, message}) => {

  return (
    <View style={styles.jobApply__body__container}>
      <Text style={styles.jobApply__body__sectionTitle}>Tu presupuesto</Text>
      <View style={styles.jobApply__body__inputRow}>
        <Text style={styles.jobApply__body__currency}>$</Text>
        <TextInput
          style={styles.jobApply__body__input}
          placeholder="0"
          keyboardType="numeric"
          value={budget}
          onChangeText={setBudget}
        />
      </View>

      <Text style={styles.jobApply__body__inputHelper}>
        Indica cuánto cobrarías por este trabajo. Si lo dejas vacío, el
        presupuesto quedará “a calcular”.
      </Text>

      <Text style={styles.jobApply__body__sectionTitle}>Mensaje</Text>
      <TextInput
        style={styles.jobApply__body__textarea}
        multiline
        placeholder="Envía un mensaje junto con tu postulación si lo necesitas"
        maxLength={200}
        value={message}
        onChangeText={setMessage}
      />
      <Text style={styles.jobApply__body__charCount}>{message.length}/200</Text>
    </View>
  );
};

export default Body;
