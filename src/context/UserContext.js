// UserContext.js
import React, { useState, useEffect, createContext } from "react";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { FIREBASE_APP } from "../config/firebaseConfig";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [activity, setActivity] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const db = getFirestore(FIREBASE_APP);

    // --- Escucha la colección "activity"
    const unsubscribeActivity = onSnapshot(collection(db, "activity"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("📦 Datos de activity:", data);
      setActivity(data);
    });

    // --- Escucha la colección "request"
    const unsubscribeRequests = onSnapshot(collection(db, "request"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("📨 Datos de request:", data);
      setRequests(data);
    });

    // Cleanup de ambos listeners
    return () => {
      unsubscribeActivity();
      unsubscribeRequests();
    };
  }, []);

  return (
    <UserContext.Provider value={{ activity, requests }}>
      {children}
    </UserContext.Provider>
  );
}
