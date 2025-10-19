import React, { useState, useEffect, createContext } from "react";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { FIREBASE_APP } from "../config/firebaseConfig";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [activities, setActivities] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const db = getFirestore(FIREBASE_APP);

    // --- Escucha la colección "activities"
    const unsubscribeActivity = onSnapshot(collection(db, "activities"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setActivities(data);
    });

    // --- Escucha la colección "requests" excepto las cerradas
    const requestsQuery = query(
      collection(db, "requests"),
      where("status", "!=", "closed"),
      orderBy("status")
    );

    const unsubscribeRequests = onSnapshot(requestsQuery, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRequests(data);
    });

    // Cleanup
    return () => {
      unsubscribeActivity();
      unsubscribeRequests();
    };
  }, []);

  return (
    <UserContext.Provider value={{ activities, requests }}>
      {children}
    </UserContext.Provider>
  );
}
