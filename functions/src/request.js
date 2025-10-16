// src/requests/requestsFunctions.js
const functions = require("firebase-functions");
const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

/**
 * Callable function: crear activity a partir de una request
 * Invocada desde la app del trabajador al aceptar o actualizar una solicitud.
 */
exports.createActivityFromRequest = functions.https.onCall(async (data, context) => {
  const { requestId, newStatus } = data;

  if (!requestId || !newStatus) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Se requiere el ID de la request y el nuevo estado."
    );
  }

  try {
    // Obtener la request original
    const requestRef = db.collection("requests").doc(requestId);
    const requestSnap = await requestRef.get();

    if (!requestSnap.exists) {
      throw new functions.https.HttpsError("not-found", "Request no encontrada.");
    }

    const requestData = requestSnap.data();

    // Crear la activity
    await db.collection("activities").doc(requestId).set({
      ...requestData,
      status: newStatus,
      paymentStatus: "pending",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Actualizar el status de la request original a "closed"
    await requestRef.update({ status: "closed" });

    return { success: true, message: "Activity creada y request cerrada correctamente." };
  } catch (error) {
    console.error("Error creando activity:", error);
    throw new functions.https.HttpsError("internal", error.message);
  }
});
