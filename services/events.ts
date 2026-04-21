import {
 
  type RetrieveEventsQuery,
  type RetrieveEventsRes,
  type RetrieveEventStatsRes,
} from "@/interface";
import { CRAWLER_API } from "@/services/axios";

export const retrieveEvents = async (
  params: RetrieveEventsQuery,
): Promise<RetrieveEventsRes> => {
  const { data } = await CRAWLER_API.get("/events", {
    params,
  });

  return data;
};

export const retrieveEventStats = async (): Promise<RetrieveEventStatsRes> => {
  const { data } = await CRAWLER_API.get("/events/stats");

  return data;
};

export const retrieveEventDetails = async (
  id: string,
): Promise<RetrieveEventsRes> => {
  const { data } = await CRAWLER_API.get(`/events/${id}`);

    return data;
}