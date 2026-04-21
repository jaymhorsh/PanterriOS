import {
  type RetrieveEventDetailsRes,
  type RetrieveEventsQuery,
  type RetrieveEventsRes,
  type RetrieveEventStatsRes,
} from "@/interface";
import API from "@/services/axios";

export const retrieveEvents = async (
  params: RetrieveEventsQuery,
): Promise<RetrieveEventsRes> => {
  const { data } = await API.get("/events", {
    params,
  });

  return data;
};

export const retrieveEventStats = async (): Promise<RetrieveEventStatsRes> => {
  const { data } = await API.get("/events/stats");

  return data;
};

export const retrieveEventDetails = async (
  id: string,
): Promise<RetrieveEventDetailsRes> => {
  const { data } = await API.get(`/events/${id}`);

  return data;
};
