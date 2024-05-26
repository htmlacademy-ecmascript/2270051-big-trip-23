import { Filters } from '../const.js';

const isEventFuture = (dateFrom) => new Date(dateFrom) > new Date();

const isEventPresent = (dateFrom, dateTo) => new Date(dateFrom) <= new Date() && new Date(dateTo) >= new Date();

const isEventPast = (dateTo) => new Date(dateTo) < new Date();

export const filter = {
  [Filters.EVERYTHING]: (events) => events,
  [Filters.FUTURE]: (events) => events.filter((event) => isEventFuture(event.dateFrom)),
  [Filters.PRESENT]: (events) => events.filter((event) => isEventPresent(event.dateFrom, event.dateTo)),
  [Filters.PAST]: (events) => events.filter((event) => isEventPast(event.dateTo))
};
