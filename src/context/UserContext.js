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

  // --- Usuario hardcodeado ---
  const user = {
    uid: "worker1",
    firstName: "Carlos",
    lastName: "Gómez",
    birthDate: "1985-02-14",
    photoURL:
      "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
    lat: -31.4168016,
    lng: -64.1900524,
    joinedAt: "2022-10-18",
    geohash: "6d6m72dpz7",
    status: "available",
    description: "Construcción y reparación de muebles de madera.",
    completedJobs: 22,
    starRating: 2.7,
    amountRating: 10,
    bannerImage:
      "https://media.istockphoto.com/id/640103960/es/foto/imagen-de-banner-de-herramientas-de-carpinter%C3%ADa.jpg?s=170667a&w=0&k=20&c=9L8vUxuHxtUuKgVYXhG61TSvZsqZG_Y0JclpnBuWPXw=",
    phone: "098-765-4321",
    services: ["carpentry", "electricity", "plumbing"],
  };

  useEffect(() => {
    const db = getFirestore(FIREBASE_APP);

    // --- Escucha la colección "activities"
    const unsubscribeActivity = onSnapshot(
      collection(db, "activities"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setActivities(data);
      }
    );

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
    <UserContext.Provider value={{ user, activities, requests }}>
      {children}
    </UserContext.Provider>
  );
}
