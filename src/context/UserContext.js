import React, { useState, useEffect, createContext } from "react";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
  doc
} from "firebase/firestore";
import auth from "@react-native-firebase/auth";
import { getApp } from "firebase/app";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState([]);
  const [activities, setActivities] = useState([]);
  const [requests, setRequests] = useState([]);
  const [postulations, setPostulations] = useState([]);

  const db = getFirestore(getApp()); 

  // 🔐 Escuchar sesión de Firebase Auth y luego traer el worker
  useEffect(() => {
    const unsubscribeAuth = auth().onAuthStateChanged((authUser) => {
      if (!authUser) {
        setUser(null);
        return;
      }

      const workerRef = doc(db, "workers", authUser.uid);
      const unsubscribeWorker = onSnapshot(workerRef, (snapshot) => {
        if (snapshot.exists()) {
          // 👇 el "user" del context es el worker de Firestore
          setUser({ uid: snapshot.id, ...snapshot.data() });
        } else {
          setUser(null);
        }
      });

      return () => unsubscribeWorker();
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!user?.uid) {
      setActivities([]);
      return;
    }

    const db = getFirestore(FIREBASE_APP);

    // --- Escucha la colección "activities"
    const unsubscribeActivity = onSnapshot(
      collection(db, "activities"),
      (snapshot) => {
        const activitiesData = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: data?.createdAt?.toDate?.() || null,
            scheduledDateTime: data?.scheduledDateTime?.toDate?.() || null,
            startedAt: data?.startedAt?.toDate?.() || null,
          };
        });
        setActivities(activitiesData);
      }
    );

    // --- Escucha la colección "requests" excepto las cerradas
    const requestsQuery = query(
      collection(db, "requests"),
      where("status", "not-in", ["closed", "rejected"]),
      orderBy("status")
    );

    const unsubscribeRequests = onSnapshot(requestsQuery, (snapshot) => {
      const requestsData = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          scheduledDateTime: data?.scheduledDateTime?.toDate?.() || null,
        };
      });

      setRequests(requestsData);
    });

    // --- Escucha las postulaciones del trabajador actual (no rechazadas)
    const postulationsQuery = query(
      collection(db, "postulations"),
      where("worker.uid", "==", user.uid)
    );

    const unsubscribePostulations = onSnapshot(
      postulationsQuery,
      (snapshot) => {
        const postulationsData = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: data?.createdAt?.toDate?.() || null,
            date: data?.date?.toDate?.() || null,
          };
        });
        setPostulations(postulationsData);
      }
    );

    // Cleanup
    return () => {
      unsubscribeActivity();
      unsubscribeRequests();
      unsubscribePostulations();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{ user, activities, requests, postulations, setActivities }}
    >
      {children}
    </UserContext.Provider>
  );
}
