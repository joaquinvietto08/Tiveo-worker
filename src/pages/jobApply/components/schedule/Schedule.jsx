import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./ScheduleStyles";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { formatDate, formatTime } from "../../../../utils/formatHelpers";
import { colors } from "../../../../styles/globalStyles";

const Schedule = ({ date, setDate, offerAnotherTime, setOfferAnotherTime }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const current = new Date(selectedDate);
      setDate(current);
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const current = new Date(date);
      current.setHours(selectedTime.getHours());
      current.setMinutes(selectedTime.getMinutes());
      setDate(current);
    }
  };

  return (
    <>
      <View style={styles.jobApply__schedule__alertBox}>
        <View style={styles.jobApply__schedule__momentRow}>
          <Ionicons name="walk-outline" size={20} color={colors.primary} />
          <Text style={styles.jobApply__schedule__alertTitle}>
            El cliente necesita el servicio ahora mismo
          </Text>
        </View>

        <TouchableOpacity
          style={styles.jobApply__schedule__checkboxRow}
          onPress={() => setOfferAnotherTime(!offerAnotherTime)}
        >
          <View
            style={[
              styles.jobApply__schedule__checkbox,
              offerAnotherTime && styles.jobApply__schedule__checkboxActive,
            ]}
          >
            {offerAnotherTime && (
              <Ionicons name="checkmark" size={16} color={colors.white} />
            )}
          </View>
          <Text style={styles.jobApply__schedule__alertSubtitle}>
            Ofrecer otro horario
          </Text>
        </TouchableOpacity>

        {offerAnotherTime && (
          <View style={styles.jobApply__schedule__dateRow}>
            <TouchableOpacity
              style={styles.jobApply__schedule__dateColumn}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.jobApply__schedule__dateTextBold}>
                {formatDate(date.toISOString())}
              </Text>
            </TouchableOpacity>

            <View style={styles.jobApply__schedule__divider} />

            <TouchableOpacity onPress={() => setShowTimePicker(true)}>
              <Text style={styles.jobApply__schedule__dateTime}>
                {formatTime(date.toISOString())} hs
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
          minimumDate={new Date()}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={date}
          mode="time"
          is24Hour
          display="default"
          onChange={handleTimeChange}
        />
      )}
    </>
  );
};

export default Schedule;
