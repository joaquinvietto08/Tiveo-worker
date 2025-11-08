import React, { useState, useEffect, useRef, createContext } from "react";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
  doc
} from "firebase/firestore";
import {
  getAuth,
  onAuthStateChanged,
} from "@react-native-firebase/auth";
import { getApp } from "firebase/app";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [activities, setActivities] = useState([]);
  const [requests, setRequests] = useState([]);
  const [postulations, setPostulations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ref para rastrear cuando cada query se completa por primera vez
  const loadedFlags = useRef({
    activity: false,
    requests: false,
    postulations: false,
  });

  const db = getFirestore(getApp());
  const authInstance = getAuth();

  // 🔐 Escuchar sesión de Firebase Auth y luego traer el worker
  useEffect(() => {
    let unsubscribeWorker = null;

    const unsubscribeAuth = onAuthStateChanged(authInstance, (authUser) => {
      if (!authUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      const workerRef = doc(db, "workers", authUser.uid);
      unsubscribeWorker = onSnapshot(workerRef, (snapshot) => {
        if (snapshot.exists()) {
          // 👇 el "user" del context es el worker de Firestore
          setUser({ uid: snapshot.id, ...snapshot.data() });
        } else {
          setUser(null);
          setLoading(false);
        }
      });
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeWorker) unsubscribeWorker();
    };
  }, []);

  useEffect(() => {
    if (!user?.uid) {
      setActivities([]);
      setRequests([]);
      setPostulations([]);
      // Importante: no tocar `loading` aquí.
      // El estado de `loading` para "no hay usuario" lo maneja la suscripción de Auth.
      // De esta forma evitamos el parpadeo de AuthRoutes antes de que Firebase resuelva la sesión.
      // Reset flags cuando no hay user
      loadedFlags.current = {
        activity: false,
        requests: false,
        postulations: false,
      };
      return;
    }

    // Reset flags cuando cambia el user
    loadedFlags.current = {
      activity: false,
      requests: false,
      postulations: false,
    };
    setLoading(true);

    const checkAllLoaded = () => {
      const flags = loadedFlags.current;
      if (flags.activity && flags.requests && flags.postulations) {
        setLoading(false);
      }
    };

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
        if (!loadedFlags.current.activity) {
          loadedFlags.current.activity = true;
          checkAllLoaded();
        }
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
      if (!loadedFlags.current.requests) {
        loadedFlags.current.requests = true;
        checkAllLoaded();
      }
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
        if (!loadedFlags.current.postulations) {
          loadedFlags.current.postulations = true;
          checkAllLoaded();
        }
      }
    );

    // Cleanup
    return () => {
      unsubscribeActivity();
      unsubscribeRequests();
      unsubscribePostulations();
    };
  }, [user?.uid]);

  return (
    <UserContext.Provider
      value={{ user, activities, requests, postulations, setActivities, loading }}
    >
      {children}
    </UserContext.Provider>
  );
}
