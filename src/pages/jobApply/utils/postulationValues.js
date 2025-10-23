import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";

export const buildPostulationValues = (
  job,
  user,
  budget,
  message,
  date,
  offerAnotherTime
) => ({
  requestId: job.id,
  worker: {
    uid: user.uid,
    firstName: user.firstName,
    lastName: user.lastName,
    photoURL: user.photoURL,
  },
  status: "postulated",
  budget,
  message,
  offerAnotherTime,
  date: offerAnotherTime ? date : "",
});

export const usePostulationValues = (job, budget, message, date, offerAnotherTime) => {
  const { user } = useContext(UserContext);
  return buildPostulationValues(job, user, budget, message, date, offerAnotherTime);
};

