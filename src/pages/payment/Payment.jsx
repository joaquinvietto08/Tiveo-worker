import React, { useContext, useMemo, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../styles/globalStyles";
import { styles } from "./PaymentStyles";
import { translateService, formatPrice } from "../../utils/formatHelpers";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { FIREBASE_APP } from "../../config/firebaseConfig";
import { UserContext } from "../../context/UserContext";

const Payment = ({ route }) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  const activity = route?.params?.activity || {};
  const categories = activity?.services || [];
  const clientName = activity?.client?.displayName || "Cliente";
  const clientId = activity?.client?.clientId || null;
  const workerId = user?.uid || null;
  const activityId = activity?.id;

  const db = useMemo(() => getFirestore(FIREBASE_APP), []);

  // Mode: total vs per-service
  const [mode, setMode] = useState("total"); // 'total' | 'perService'
  const [perServiceAmounts, setPerServiceAmounts] = useState(
    () => categories.map(() => "")
  );
  const [totalAmountInput, setTotalAmountInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [paymentId, setPaymentId] = useState(null);
  const [currentStatus, setCurrentStatus] = useState(null); // pending | paid | failed

  // If a payment already exists for this activity, load it once
  useEffect(() => {
    const loadExisting = async () => {
      try {
        if (!activityId) return;
        const q = query(collection(db, "payments"), where("activityId", "==", activityId));
        const snap = await getDocs(q);
        if (!snap.empty) {
          const docSnap = snap.docs[0];
          setPaymentId(docSnap.id);
          const data = docSnap.data();
          setCurrentStatus(data?.status || null);
          // Hydrate UI
          if (Array.isArray(data?.services) && data.services.length) {
            // Map amounts back by category
            const map = new Map(data.services.map((s) => [s.category, s.amount]));
            setPerServiceAmounts(categories.map((c) => String(map.get(c) ?? "")));
          }
          if (data?.totalAmount != null) {
            setTotalAmountInput(String(data.totalAmount));
          }
          // Set initial mode (solo visual)
          const hasAnyPositive = (data?.services || []).some((s) => typeof s.amount === "number" && s.amount > 0);
          setMode(hasAnyPositive ? "perService" : "total");
        }
      } catch (e) {
        console.warn("No se pudo cargar el pago existente", e);
      }
    };
    loadExisting();
  }, [activityId, db, categories]);

  const parsedPerService = perServiceAmounts.map((v) => Number(String(v).replace(/\D/g, "")) || 0);
  const perServiceTotal = parsedPerService.reduce((acc, n) => acc + (Number.isFinite(n) ? n : 0), 0);
  const totalValue = mode === "perService" ? perServiceTotal : Number(String(totalAmountInput).replace(/\D/g, "")) || 0;

  const canSubmit = useMemo(() => {
    if (paymentId) return false; // no actualizar, solo crear
    if (!activityId || !clientId || !workerId) return false;
    if (mode === "total") return totalValue > 0;
    return parsedPerService.some((n) => n > 0);
  }, [activityId, clientId, workerId, mode, totalValue, parsedPerService, paymentId]);

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      const payload = {
        activityId,
        clientId,
        workerId,
        status: "pending",
        services: categories.map((c, idx) => ({ category: c, amount: mode === "perService" ? parsedPerService[idx] : 0 })),
        totalAmount: totalValue,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const ref = await addDoc(collection(db, "payments"), payload);
      setPaymentId(ref.id);
      setCurrentStatus("pending");
    } catch (e) {
      console.error("Error creando el pago", e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={[styles.payment__container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />

      <ScrollView contentContainerStyle={styles.payment__content} showsVerticalScrollIndicator={false}>
        <View style={styles.payment__titleRow}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
            style={styles.payment__backBtn}
          >
            <MaterialIcons name="arrow-back" size={22} color={colors.black} />
          </TouchableOpacity>
          <Text style={styles.payment__title}>Cobro del trabajo</Text>
        </View>

        <Text style={styles.payment__subtitle}>
          Le estás por cobrar a <Text style={styles.payment__bold}>{clientName}</Text>
        </Text>

        <View style={styles.payment__card}>
          <Text style={styles.payment__sectionTitle}>Servicios</Text>
          {categories?.length ? (
            <View style={styles.payment__chipsRow}>
              {categories.map((c) => (
                <View key={c} style={styles.payment__chip}>
                  <Text style={styles.payment__chipText}>{translateService(c)}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.payment__muted}>Sin categorías registradas</Text>
          )}
        </View>

        <View style={styles.payment__toggleRow}>
          <TouchableOpacity
            style={[styles.payment__toggleBtn, mode === "total" && styles.payment__toggleBtnActive]}
            activeOpacity={0.9}
            onPress={() => setMode("total")}
          >
            <Text style={[styles.payment__toggleText, mode === "total" && styles.payment__toggleTextActive]}>Total</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.payment__toggleBtn, mode === "perService" && styles.payment__toggleBtnActive]}
            activeOpacity={0.9}
            onPress={() => setMode("perService")}
          >
            <Text style={[styles.payment__toggleText, mode === "perService" && styles.payment__toggleTextActive]}>Por servicio</Text>
          </TouchableOpacity>
        </View>

        {mode === "total" ? (
          <View style={styles.payment__card}>
            <Text style={styles.payment__sectionTitle}>Monto total</Text>
            <TextInput
              style={styles.payment__input}
              keyboardType="number-pad"
              placeholder="Ingresá el total"
              value={totalAmountInput}
              onChangeText={setTotalAmountInput}
            />
            <Text style={styles.payment__hint}>Ej: 25000</Text>
          </View>
        ) : (
          <View style={styles.payment__card}>
            <Text style={styles.payment__sectionTitle}>Montos por servicio</Text>
            {categories.map((c, idx) => (
              <View key={c} style={styles.payment__row}>
                <Text style={styles.payment__label}>{translateService(c)}</Text>
                <TextInput
                  style={styles.payment__inputInline}
                  keyboardType="number-pad"
                  placeholder="0"
                  value={perServiceAmounts[idx]}
                  onChangeText={(t) => {
                    setPerServiceAmounts((prev) => {
                      const next = [...prev];
                      next[idx] = t;
                      return next;
                    });
                  }}
                />
              </View>
            ))}
            <View style={styles.payment__totalRow}>
              <Text style={styles.payment__totalLabel}>Total</Text>
              <Text style={styles.payment__totalValue}>{formatPrice(perServiceTotal)}</Text>
            </View>
          </View>
        )}

        {paymentId ? (
          <View style={styles.payment__statusCard}>
            <Text style={styles.payment__statusTitle}>Estado</Text>
            <Text style={styles.payment__statusPending}>
              {currentStatus === "paid"
                ? "Pagado"
                : currentStatus === "failed"
                ? "Fallido"
                : "Pendiente de pago"}
            </Text>
          </View>
        ) : null}

        {!paymentId && (
          <TouchableOpacity
            style={[styles.payment__submitBtn, !canSubmit && styles.payment__submitBtnDisabled]}
            onPress={handleSubmit}
            activeOpacity={0.9}
            disabled={!canSubmit || submitting}
          >
            {submitting ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <Text style={styles.payment__submitText}>Cobrar</Text>
            )}
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

export default Payment;
