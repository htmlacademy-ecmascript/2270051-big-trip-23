import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { Filters } from './const.js';
dayjs.extend(duration);

const getRandomArrayElement = ((items) => items[Math.floor(Math.random() * items.length)]);

const getFormattedDate = (dateString, format) => dayjs(dateString).format(format);

const getDuration = (dateFrom, dateTo) => {
  const start = dayjs(dateFrom).startOf('minute');
  const end = dayjs(dateTo).startOf('minute');
  const diffInMs = end.diff(start);
  // eslint-disable-next-line no-shadow
  const duration = dayjs.duration(diffInMs);
  const days = Math.floor(duration.asDays());
  const hours = duration.hours();
  const minutes = duration.minutes();

  if (days > 0) {
    return `${days.toString().padStart(2, '0')}D ${hours.toString().padStart(2, '0')}H ${minutes.toString().padStart(2, '0')}M`;
  }

  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}H ${minutes.toString().padStart(2, '0')}M`;
  }

  return `${minutes}M`;
};

const getActiveClass = (isActive, activeClass) => isActive ? activeClass : '';

const isEventFuture = (dateFrom) => new Date(dateFrom) > new Date();

const isEventPresent = (dateFrom, dateTo) => new Date(dateFrom) <= new Date() && new Date(dateTo) >= new Date();

const isEventPast = (dateTo) => new Date(dateTo) < new Date();

const filter = {
  [Filters.EVERYTHING]: (events) => events,
  [Filters.FUTURE]: (events) => events.filter((event) => isEventFuture(event.dateFrom)),
  [Filters.PRESENT]: (events) => events.filter((event) => isEventPresent(event.dateFrom, event.dateTo)),
  [Filters.PAST]: (events) => events.filter((event) => isEventPast(event.dateTo))
};

const updateData = (data, update) => data.map((item) => item.id === update.id ? update : item);
const updateItem = (item, prop) => ({...item, ...prop});

export { getRandomArrayElement, getFormattedDate, getDuration, getActiveClass, filter, updateData, updateItem };
