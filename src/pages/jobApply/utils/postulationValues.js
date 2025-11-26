import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";

const buildWorkerPayload = (user) => {
  if (!user) return null;

  const fallbackName = `${user.name || ""} ${user.lastName || ""}`.trim();

  return {
    uid: user.uid,
    workerName: user.workerName || fallbackName,
    photoURL: user.photo || null,
  };
};

export const buildPostulationValues = (
  job,
  user,
  budget,
  message,
  date,
  offerAnotherTime
) => {
  const worker = buildWorkerPayload(user);
  if (!worker?.uid) return null;

  return {
    requestId: job.id,
    worker,
    status: "postulated",
    budget,
    message,
    offerAnotherTime,
    date: offerAnotherTime ? date : "",
  };
};

export const usePostulationValues = (
  job,
  budget,
  message,
  date,
  offerAnotherTime
) => {
  const { user } = useContext(UserContext);
  if (!user?.uid) return null;
  return buildPostulationValues(
    job,
    user,
    budget,
    message,
    date,
    offerAnotherTime
  );
};
