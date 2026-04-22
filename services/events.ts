import {
  UpdateEventByIdReq,
  RetrieveEventsQuery,
  RetrieveEventsRes,
  RetrieveEventStatsRes,
  RetrieveEventDetailsRes,
  EventFilters,
} from '@/interface';
import { CRAWLER_API } from '@/services/axios';

export const retrieveEvents = async (
  params: RetrieveEventsQuery,
): Promise<RetrieveEventsRes> => {
  const { data } = await CRAWLER_API.get('/events', {
    params,
  });

  return data;
};

export const retrieveEventStats = async (): Promise<RetrieveEventStatsRes> => {
  const { data } = await CRAWLER_API.get('/events/stats');

  return data;
};

export const retrieveEventDetails = async (
  id: string,
): Promise<RetrieveEventDetailsRes> => {
  const { data } = await CRAWLER_API.get(`/events/${id}`);

  return data;
};

export const updateEventById = async (
  id: string,
  payload: UpdateEventByIdReq,
): Promise<RetrieveEventsRes> => {
  const { data } = await CRAWLER_API.put(`/events/${id}`, payload);

  return data;
};
export const retrievePublsihedEvents = async (
  params: EventFilters,
): Promise<RetrieveEventsRes> => {
  const { data } = await CRAWLER_API.get('/events/published', { params });
  return data;
};
