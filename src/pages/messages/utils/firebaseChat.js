import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";

const conversationsCol = firestore().collection("conversations");

export async function ensureConversation(activityId, clientId, workerId) {
  const ref = conversationsCol.doc(activityId);
  const snap = await ref.get();
  if (!snap.exists) {
    const payload = {
      activityId,
      createdAt: firestore.FieldValue.serverTimestamp(),
    };
    if (clientId != null) payload.clientId = clientId;
    if (workerId != null) payload.workerId = workerId;
    await ref.set(payload);
  }
  return ref;
}

export async function sendTextMessage({
  activityId,
  text,
  clientId,
  workerId,
}) {
  if (!activityId) throw new Error("activityId requerido");
  if (!clientId) throw new Error("clientId requerido");

  const convoRef = await ensureConversation(activityId, clientId, workerId);
  const msgRef = convoRef.collection("messages").doc();

  await msgRef.set({
    type: "text",
    text: text ?? "",
    clientId,
    sender: "client",
    createdAt: firestore.FieldValue.serverTimestamp(),
  });

  return msgRef.id;
}

/* ***************************************************************************** */

export async function sendImageMessage({ activityId, uri, clientId, workerId }) {
  if (!activityId) throw new Error("activityId requerido");
  if (!clientId) throw new Error("clientId requerido");
  if (!uri) throw new Error("uri requerido");

  const convoRef = await ensureConversation(activityId, clientId, workerId);
  const msgRef = convoRef.collection("messages").doc();

  await msgRef.set({
    type: "image",
    clientId,
    sender: "client",
    imageUrl: null,
    createdAt: firestore.FieldValue.serverTimestamp(),
  });

  const ref = storage().ref(`messages/${activityId}/${msgRef.id}.jpg`);

  let snapshot;
  try {
    snapshot = await ref.putFile(uri);
  } catch (e) {
    console.warn("❌ Error real en putFile:", {
      code: e?.code,
      message: e?.message,
    });
    throw e;
  }

  try {
    const url = await storage().ref(snapshot.metadata.fullPath).getDownloadURL();
    await msgRef.update({ imageUrl: url });
    return msgRef.id;
  } catch (e) {
    console.warn("❌ Error en getDownloadURL:", {
      code: e?.code,
      message: e?.message,
    });
    try {
      await msgRef.delete();
    } catch {}
    throw e;
  }
}

/* ***************************************************************************** */

export function listenMessages(activityId, onChange) {
  if (!activityId) {
    console.warn("listenMessages llamado sin activityId");
    return () => {};
  }

  return conversationsCol
    .doc(activityId)
    .collection("messages")
    .orderBy("createdAt", "asc")
    .onSnapshot(
      (snap) => {
        const items = snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        onChange(items);
      },
      (error) => {
        console.warn("Error en listenMessages:", error);
        onChange([]);
      }
    );
}
