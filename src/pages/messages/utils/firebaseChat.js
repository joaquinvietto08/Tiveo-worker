import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "@react-native-firebase/firestore";
import {
  getStorage,
  ref as storageRef,
  putFile,
  getDownloadURL,
} from "@react-native-firebase/storage";

const db = getFirestore();
const storage = getStorage();
const conversationsCol = collection(db, "conversations");

export async function ensureConversation(activityId, clientId, workerId) {
  const ref = doc(conversationsCol, activityId);
  const snap = await getDoc(ref);
  if (!snap.exists) {
    const payload = {
      activityId,
      createdAt: serverTimestamp(),
    };
    if (clientId != null) payload.clientId = clientId;
    if (workerId != null) payload.workerId = workerId;
    await setDoc(ref, payload);
  }
  return ref;
}

export async function sendTextMessage({
  activityId,
  text,
  workerId,
  clientId,
}) {
  if (!activityId) throw new Error("activityId requerido");
  if (!workerId) throw new Error("workerId requerido");

  const convoRef = await ensureConversation(activityId, clientId, workerId);
  const msgRef = doc(collection(convoRef, "messages"));

  await setDoc(msgRef, {
    type: "text",
    text: text ?? "",
    clientId: clientId ?? null,
    workerId,
    sender: "worker",
    createdAt: serverTimestamp(),
  });

  return msgRef.id;
}

/* ***************************************************************************** */

export async function sendImageMessage({
  activityId,
  uri,
  workerId,
  clientId,
}) {
  if (!activityId) throw new Error("activityId requerido");
  if (!workerId) throw new Error("workerId requerido");
  if (!uri) throw new Error("uri requerido");

  const convoRef = await ensureConversation(activityId, clientId, workerId);
  const msgRef = doc(collection(convoRef, "messages"));

  await setDoc(msgRef, {
    type: "image",
    clientId: clientId ?? null,
    workerId,
    sender: "worker",
    imageUrl: null,
    createdAt: serverTimestamp(),
  });

  const ref = storageRef(storage, `messages/${activityId}/${msgRef.id}.jpg`);

  let snapshot;
  try {
    snapshot = await putFile(ref, uri);
  } catch (e) {
    console.warn("❌ Error real en putFile:", {
      code: e?.code,
      message: e?.message,
    });
    throw e;
  }

  try {
    const uploadedRef = storageRef(storage, snapshot.metadata.fullPath);
    const url = await getDownloadURL(uploadedRef);
    await updateDoc(msgRef, { imageUrl: url });
    return msgRef.id;
  } catch (e) {
    console.warn("❌ Error en getDownloadURL:", {
      code: e?.code,
      message: e?.message,
    });
    try {
      await deleteDoc(msgRef);
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

  const messagesQuery = query(
    collection(doc(conversationsCol, activityId), "messages"),
    orderBy("createdAt", "asc")
  );

  return onSnapshot(
    messagesQuery,
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
